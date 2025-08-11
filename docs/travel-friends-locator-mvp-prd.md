# Travel Friends Locator — MVP PRD 🚀

Last Updated: August 10, 2025  
Status: MVP Scope (Execution-Ready)

---

## 🎯 MVP Goal
Ship a privacy-first social travel MVP where friends can:
- See each other’s current city (city-level only) when traveling; “Home” when in home country
- Add and view future trips (destination city + dates)
- Receive overlap notifications for shared cities and dates

Everything is friends-only and opt-in. No precise GPS sharing.

---

## 🧭 Scope (Must-Haves)
- Accounts & Profiles (Clerk): sign in/up; set home country; profile basics
- Friends: send/accept requests; friends-only visibility
- Privacy Controls: master sharing toggle, share current city, share future trips, go invisible
- City Status: mobile detection; web manual set; home vs traveling logic
- Trips CRUD: create/edit/delete; list upcoming trips; friends can view
- Discover Views: list-first dashboard of friends currently traveling and upcoming trips (30 days)
- Notifications: overlap alerts; arrival/departure summaries (rate-limited); in-app + mobile push
- Analytics: minimal activation/engagement events

---

## 🚫 Out of Scope (MVP)
- Real-time precise location or background tracking
- Explore new travelers, Activities/Events, Dating Mode
- Granular friend groups or per-trip audiences
- Photo stories/comments; monetization
- Full map UX (optional lightweight map can follow post-MVP)

---

## 🏗️ Architecture
- Monorepo (Turborepo ideal, optional for MVP)
  - `apps/web` — Next.js 14 (App Router, TS)
  - `apps/mobile` — Expo React Native (TS)
  - `convex/` — Convex schema, queries, mutations, jobs
  - `packages/types` — shared TypeScript types (Zod schemas)
  - `packages/ui` — optional shared UI primitives (web/mobile)

Environments: `development`, `production`.

---

## 🔑 Environment Variables
- Clerk
  - `CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
- Convex
  - `CONVEX_DEPLOYMENT`
  - `CONVEX_SITE_URL`
- Maps/Geocoding
  - `MAPBOX_TOKEN` (or MapLibre/Nominatim config)
- Notifications (mobile)
  - Expo/FCM/APNs config as required by Expo Notifications
- Web
  - `NEXT_PUBLIC_*` as needed (non-secret)

Provide `.env.example` files for web, mobile, and Convex with placeholders.

---

## 🗃️ Data Model (Convex) — TypeScript Interfaces
```ts
// users.ts
export interface UserDoc {
  _id: string;
  clerkUserId: string;
  name: string;
  username?: string;
  photoUrl?: string;
  homeCountryCode: string; // ISO-3166-1 alpha-2
  createdAt: number; // epoch ms
}

export type FriendshipStatus = "pending" | "accepted" | "blocked";

export interface FriendshipDoc {
  _id: string;
  userIdA: string; // users._id (lower id for canonical ordering recommended)
  userIdB: string; // users._id
  status: FriendshipStatus;
  createdAt: number;
}

export interface SettingsDoc {
  _id: string;
  userId: string;
  shareCurrentCity: boolean; // default false
  shareFutureTrips: boolean; // default true
  invisible: boolean; // default false
}

export type TravelStatus = "home" | "traveling";

export interface CurrentStatusDoc {
  _id: string;
  userId: string;
  status: TravelStatus;
  cityName?: string;
  countryCode?: string; // ISO-3166-1 alpha-2
  cityLat?: number; // centroid
  cityLng?: number; // centroid
  updatedAt: number;
}

export interface TripDoc {
  _id: string;
  userId: string;
  cityName: string;
  countryCode: string;
  cityLat: number;
  cityLng: number;
  startDate: string; // ISO date (yyyy-mm-dd)
  endDate: string; // ISO date (yyyy-mm-dd)
  note?: string;
  createdAt: number;
}

export type NotificationType = "overlap" | "arrival" | "departure";

export interface NotificationDoc {
  _id: string;
  userId: string;
  type: NotificationType;
  payloadJson: string; // serialized payload
  read: boolean;
  createdAt: number;
}
```

Constraints:
- Store city centroid only; never raw GPS traces
- One `currentStatus` doc per user (upsert)

---

## 🔐 Access Control Rules
- Authentication: Clerk tokens verified server-side by Convex auth integration
- Read:
  - A user can read their own docs
  - Accepted friends can read each other’s:
    - `currentStatus` only if `settings.shareCurrentCity` and `!settings.invisible`
    - `trips` only if `settings.shareFutureTrips` and `!settings.invisible`
  - No public reads
- Write:
  - Only owners can write their `settings`, `currentStatus`, `trips`
  - Friendship creation/accept requires involvement of both users
- Moderation & Safety:
  - Soft-delete or redact on user deletion
  - Rate-limit write endpoints (see Rate Limits)

---

## 🔌 Convex Functions (Contracts)
Names are illustrative; implement with Convex `mutation`/`query`.

- Users
  - `users.getMe(): UserDoc`
  - `users.initProfile({ homeCountryCode, name, username?, photoUrl? }): UserDoc`
  - `users.updateProfile({ name?, username?, photoUrl?, homeCountryCode? }): void`
- Settings
  - `settings.getMine(): SettingsDoc`
  - `settings.update({ shareCurrentCity?, shareFutureTrips?, invisible? }): void`
- Friendships
  - `friends.search({ query }): UserDoc[]` (exclude already-friends/self)
  - `friends.request({ toUserId }): void`
  - `friends.accept({ friendshipId }): void`
  - `friends.list(): { pendingIncoming: UserDoc[]; pendingOutgoing: UserDoc[]; accepted: UserDoc[] }`
- Status
  - `status.upsert({ status, cityName?, countryCode?, cityLat?, cityLng? }): void`
  - `status.getFriends(): Array<{ user: UserDoc; status: CurrentStatusDoc | null }>`
- Trips
  - `trips.create({ cityName, countryCode, cityLat, cityLng, startDate, endDate, note? }): TripDoc`
  - `trips.update({ tripId, cityName?, countryCode?, cityLat?, cityLng?, startDate?, endDate?, note? }): void`
  - `trips.delete({ tripId }): void`
  - `trips.getMine(): TripDoc[]`
  - `trips.getFriendsUpcoming({ horizonDays: number }): Array<{ user: UserDoc; trips: TripDoc[] }>`
- Notifications
  - `notifications.list({ unreadOnly? }): NotificationDoc[]`
  - `notifications.markRead({ notificationId }): void`

System jobs (Convex cron/queue):
- `overlaps.onTripChange({ tripId })`
- `overlaps.onStatusChange({ userId })`
- Optional daily digest generator

---

## 🧠 Overlap Detection — Algorithm
```ts
function rangesOverlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart <= bEnd && bStart <= aEnd;
}

// triggers: on trip create/update; on status change
// for user U, check each accepted friend F
function checkOverlap(U, F) {
  // Current status overlap (city today)
  if (U.status.status === "traveling" && F.settings.shareFutureTrips && !F.settings.invisible) {
    const today = new Date().toISOString().slice(0,10);
    // F future trips in same city/country
    for (const t of F.trips) {
      if (t.cityName === U.status.cityName && t.countryCode === U.status.countryCode) {
        if (rangesOverlap(new Date(today), new Date(today), new Date(t.startDate), new Date(t.endDate))) {
          enqueueOverlap(U, F, t);
        }
      }
    }
  }
  // Trip-to-trip overlap
  for (const uTrip of U.trips) {
    for (const fTrip of F.trips) {
      if (uTrip.cityName === fTrip.cityName && uTrip.countryCode === fTrip.countryCode) {
        if (rangesOverlap(new Date(uTrip.startDate), new Date(uTrip.endDate), new Date(fTrip.startDate), new Date(fTrip.endDate))) {
          enqueueOverlap(U, F, uTrip, fTrip);
        }
      }
    }
  }
}
```
Rate-limit: do not create duplicate overlap notifications for the same pair+city+range within 24h.

---

## 📍 Location & Geocoding
- Mobile (Expo): foreground permission request; poll on app focus and via manual "Update my city" button
- Reverse geocode: Mapbox Places (or MapLibre/Nominatim). Store city, country code, centroid
- Home vs Away logic:
  - If `detectedCountryCode === homeCountryCode` → `status=home` (do not show city)
  - Else → `status=traveling` with city fields (subject to `shareCurrentCity` and `!invisible` for visibility)
- Web: no continuous tracking; manual set of current city via search

---

## 🖥️ Web (Next.js) — Routes & Views
- `/` (Dashboard)
  - Sections: Currently Traveling (friends), Upcoming Trips (next 30 days)
  - Quick actions: Add Trip, Invite Friends
- `/trips`
  - List own trips; Create/Edit modal (city search, date range, note)
- `/friends`
  - Requests (incoming/outgoing), search & add, accepted list
- `/profile/[username]`
  - Show name, avatar, status (Home or City), upcoming trips
- `/settings`
  - Home country selector; toggles (share current city, share future trips, invisible)
- `/notifications`
  - List read/unread; click-through to related entity

UX copy examples:
- Status badge: "Home" or "In London, UK"
- Toggle help text: "Share only your city with friends (never exact location)."

---

## 📱 Mobile (React Native/Expo) — Screens
Tab Navigator: Home, Trips, Friends, Notifications, Settings
- Home: same sections as web dashboard
- Trips: list + create/edit
- Friends: requests, search, accepted
- Notifications: list + mark read
- Settings: toggles, home country, location permission status
- Location: foreground polling; manual update CTA

---

## 🔔 Notifications
Types: `overlap`, `arrival`, `departure`
- In-app list for all platforms
- Push: Expo Notifications (request permission on first need)

Payloads (examples):
```json
{
  "type": "overlap",
  "city": "Toronto",
  "countryCode": "CA",
  "friendName": "Alex",
  "dates": "Oct 5–10"
}
```
Rate limits:
- Arrival/Departure: suppress duplicates within 6h per user
- Overlap: suppress duplicates per (userA, userB, city, month) window

Respect privacy toggles: if user becomes invisible or turns off sharing, do not send.

---

## 📈 Analytics (Minimal)
- `user_signed_up`
- `profile_completed` (home country set)
- `friend_accepted`
- `toggle_share_current_city` (on/off)
- `trip_created`
- `overlap_notification_sent`
- `overlap_notification_opened`

Use a thin wrapper so events can be swapped (Mixpanel/GA). Avoid PII.

---

## 🛑 Rate Limits & Abuse Controls
- `friends.request`: max 20/day/user; block rapid duplicates
- `trips.create`: max 20/month/user
- `status.upsert`: ignore updates more than 1/min unless manual
- Notifications: deduplicate as above

---

## 🧪 Testing Plan
- Unit
  - Overlap logic (date intersections, same city check)
  - Home/away determination
  - Access guards (friends-only visibility)
- Integration
  - Create two users; accept friendship; create trips; validate overlap notifications
  - Status change triggers arrival/departure
  - Settings toggles hide/show data to friends
- E2E (smoke)
  - Happy path from sign-up → set home country → add friend → add trips → see dashboard
- Seed Script
  - Create N demo users, friendships, and trips across cities to populate lists

---

## 📦 Deliverables
- Running web + mobile apps with README setup
- `.env.example` files for web, mobile, Convex
- Convex schema and functions implemented with access checks
- Minimal UI with list-first dashboard; functional trip CRUD; notifications center
- Seed script and basic tests (unit + minimal integration)

---

## ✅ Acceptance Criteria (Executable)
- Given two users are friends and both have appropriate toggles ON, when one is traveling, the other sees "In <City, CC>"; when they return home, it shows "Home"
- When either user creates a trip that overlaps in the same city, both receive an overlap notification (in-app; push on mobile if enabled)
- A user can create, edit, delete trips and see their own trip list; friends see only upcoming trips respecting privacy settings
- No UI shows precise coordinates; only city/country text and optional flags
- Toggling invisible immediately removes user status/trips from friends’ views and suppresses notifications

---

## 🔒 Security & Privacy
- Friends-only visibility; mutual acceptance required
- City-level only storage; no raw GPS traces or logs
- TLS everywhere; secrets stored securely via platform keychain/CI secrets
- Account deletion removes trips/status/settings and irreversibly unlinks friendships

---

## 🛠️ Implementation Checklist (for Code Executor Agent)
- Setup projects: Next.js app, Expo app, Convex project
- Integrate Clerk on web + mobile; secure Convex auth
- Implement Convex schema and access rules
- Build friends system (request/accept/list) endpoints + UIs
- Build settings UI and persistence
- Implement trips CRUD + lists and friend visibility
- Implement status upsert (web manual; mobile geocode flow)
- Build dashboard lists (currently traveling, upcoming 30 days)
- Implement overlap detection triggers and notifications
- Integrate Expo Notifications (mobile) and in-app notifications center (both)
- Add analytics wrapper and key events
- Create seed script; write unit tests for overlap/access; add minimal integration test

---

## 🧭 Post-MVP Notes (Do Not Build Now)
- Map view with friend pins
- Explore new travelers (opt-in), Activities/Events, Dating Mode
- Granular privacy audiences, per-trip visibility
- Background location and richer notification digests

---
