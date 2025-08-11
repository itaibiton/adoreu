# Travel Friends Locator – Product Requirements Document (Enhanced) ✈️🗺️

Last Updated: August 10, 2025
Status: Draft v1.1

---

## ✨ Vision
Make travel more social and serendipitous by safely sharing city-level presence and future trips with friends. When you’re abroad, friends see “In London, UK.” When you’re home, they see “Home.” No exact locations, ever.

## 🎯 Goals
- **Connect friends through travel**: effortless awareness of who’s where and when
- **Privacy-first by design**: opt-in, friends-only, city-level only
- **Inspire trips**: see friends’ plans and coordinate overlaps
- **Grow via network effects**: more friends = more value

## 👤 Primary Users
- Frequent travelers and digital nomads
- Expats and study-abroad students
- Friends with globally distributed social circles

## 🧩 Core Concepts
- **City-Level Status**: Current city shared only if opted-in and away from home country
- **Home vs Away**: Automatic switch based on country; at home → show “Home”
- **Future Trips**: Share destination + dates; friends can browse and plan overlaps
- **Friends Graph**: Mutual connections only; no public visibility

## ✅ Key Objectives & Success Metrics
- **Activation**: % users who set home country + add 3+ friends
- **Engagement**: MAU, trips created/user, overlaps generated
- **Network growth**: invites sent/accepted, avg friend count

---

## 🗺️ Features (Enhanced Overview)

### 1) City-Level Location Sharing (Live Status) 📍
- Opt-in only; default OFF
- Detect city via GPS (mobile) or manual set (web)
- Store/share city name, country code, centroid only
- Visible to accepted friends when away from home country
- Manual override allowed (e.g., pick nearby city)

### 2) “Home” Status Indicator 🏠
- Show “Home” when within home country
- Auto transitions across borders (home ↔ away)

### 3) Future Trips & Planning 🗓️
- Add trips: destination city + date range + optional note
- Friends can view upcoming trips list and profile sections
- Map/list views; MVP prefers list first

### 4) Friends Map & Activity Feed 🧭
- Map: pins at city centroids (avatars/initials)
- List: sections for “Currently Traveling” and “Upcoming (30 days)”

### 5) Notifications & Alerts 🔔
- Overlap alerts for same city + overlapping dates
- Arrival/departure summaries (rate-limited)
- Respect privacy toggles and friendship status

### 6) Privacy Controls 🔒
- Master sharing toggle; “Go Invisible” option
- Friends-only visibility; no public endpoints
- No precise GPS stored; city-level only

### 7) Profiles & Social 👥
- Profile: name, photo, home country, status (“Home” or city), upcoming trips
- Friends: add, accept, list; invite by link
- Optional lightweight reactions to trips (like/cheers) — defer if needed

### 8) Explore New Travelers (Opt-in) 🌍
- Purpose: discover and connect with new travelers in the same city or overlapping soon — strictly opt-in and city-level only
- Visibility: users toggle a Discoverable mode; when ON, they appear in city-level explore to non-friends who also have Discoverable ON
- Controls: Discoverable ON/OFF, who can contact me (friends-of-friends | everyone-in-city | none), quiet hours
- Cards show: first name, city/country, “in town until <date>” or trip dates, up to 3 interests; never exact location
- Contact: send a “Wave” or “Request to Connect”; messaging opens only after both accept a connection request (double opt-in)

### 9) Activities & Events 🗺️🎟️
- Activities: lightweight intentions like “Coffee walk in Lisbon Sat morning” with city, time window, capacity, and interest tags
- Visibility: friends-only by default; optional share with Discoverable travelers in same city/time window
- Events: small city-level gatherings (e.g., “Coworking in Roma, 14:00–17:00, 6 spots”)
  - Host chooses visibility (friends | city-discoverable | invite-only)
  - No precise venue until RSVP accepted; show neighborhood/area only
  - Optional group chat for attendees after RSVP
- Safety: report/ban, attendee limits, host reputation hints; keep location coarse until trust is established

### 10) Dating Mode (Opt-in) 💘
- Separate, opt-in profile layer for romantic intent; OFF by default
- Controls: age range, gender preferences, intent (casual, dating, friends-first), safety prompts
- Discovery: city-level dating cards visible only among users who opted into Dating Mode
- Matching: double opt-in (like ↔ like); chat opens after match; rate-limit first messages
- Safety: optional photo verification, block/report, harassment-throttle heuristics

---

## 🧪 Non-Goals (MVP Defers)
- Real-time exact location, live movement
- Granular friend lists (close friends, custom audiences)
- Photo stories, travel journals, content feeds
- Trip booking/integration, expense sharing
- Monetization (ads, subscriptions)
- Explore, Activities/Events, and Dating Mode are post-MVP (guardrails defined now)

---

## 🛡️ Privacy & Safety Principles
- Opt-in sharing with clear copy
- Minimum data stored: city, country, centroid, date ranges
- Friends-only read access; mutual connections required
- No public profiles with location/trips
- Secure storage and transport; audit access rules

Safety & Moderation for Explore/Activities/Dating:
- All discovery features are opt-in and city-level; exact venues remain private until RSVP accepted
- Double opt-in for new contacts and dating matches before messaging; default DM closed
- Rate limits on waves/likes/requests and first messages; progressive limits for new accounts
- Robust block/report that immediately hides presence; repeat offenders throttled/banned
- Optional photo verification and basic content moderation on bios/activity notes

---

## 🏗️ Platform & Tech
- **Web**: Next.js (marketing + web client)
- **Mobile**: React Native (Expo) for iOS/Android; foreground location updates
- **Backend**: Convex (data, real-time subscriptions)
- **Auth**: Clerk (web + mobile)
- **Maps/Geocoding**: Mapbox or MapLibre + Nominatim
- **Push**: Expo Notifications / FCM
- **Analytics**: Mixpanel/GA minimal events (activation, trips, invites, overlaps)

---

## 📐 Data Model (Convex)
- `users`: clerkUserId, name, username, photoUrl, homeCountryCode, createdAt
- `friendships`: userIdA, userIdB, status: pending|accepted|blocked, createdAt
- `settings`: userId, shareCurrentCity (bool), shareFutureTrips (bool), invisible (bool)
- `currentStatus`: userId, status: home|traveling, cityName?, countryCode?, cityLat?, cityLng?, updatedAt
- `trips`: userId, cityName, countryCode, cityLat, cityLng, startDate, endDate, note?, createdAt
- `notifications`: userId, type: overlap|arrival|departure, payloadJson, read, createdAt

Post-MVP (Explore/Activities/Dating):
- `discoverability`: userId, discoverable (bool), audience: friendsOfFriends|city|none, quietHours?, interests: string[]
- `interests`: id, label, category (e.g., food, outdoors, tech)
- `activities`: id, hostUserId, cityName, countryCode, startAt, endAt, capacity?, visibility: friends|city|invite_only, interests: string[], note?, createdAt
- `activity_rsvps`: id, activityId, userId, status: requested|accepted|declined, createdAt
- `events`: id, hostUserId, title, cityName, countryCode, startAt, endAt, capacity?, visibility, neighborhood?, details?
- `event_rsvps`: id, eventId, userId, status: requested|accepted|declined, createdAt
- `dating_profiles`: userId, enabled (bool), ageRange, genderPreferences, intent, bioSnippet?, photoUrls[]
- `dating_likes`: id, fromUserId, toUserId, createdAt
- `dating_matches`: id, userIdA, userIdB, createdAt
- `blocks`: id, blockerUserId, blockedUserId, createdAt
- `reports`: id, reporterUserId, subjectUserId|activityId|eventId, reason, createdAt, status

---

## 🔁 Overlap Logic
- Overlap if same city/country AND date ranges intersect
- Current traveling is treated as [today, today]
- On create/update of trip or status change, check all accepted friends and create notifications accordingly; rate-limit arrivals/departures (e.g., ≥6h)

---

## 🧭 Primary Flows
- Onboarding: set home country, invite friends, toggle sharing
- Share Status: mobile permission → detect city → apply home/away logic
- Add Trip: city + dates (+note) → visible to friends
- Discover: dashboard sections + map; tap friend → profile with trips
- Notify: overlaps and arrivals
- Explore (post-MVP): toggle Discoverable → browse city cards → send wave/request → connect → chat
- Activities (post-MVP): create activity/event → manage RSVPs → unlock attendee chat → share neighborhood on accept
- Dating (post-MVP): enable Dating Mode → set prefs → like/match → chat

---

## ✅ Acceptance Criteria (MVP)
- Users can set home country and manage sharing toggles
- Friends-only visibility enforced end-to-end
- Home/away logic works reliably; “Home” never reveals city
- Trips visible to friends; overlaps generate alerts
- No precise coordinates shown in UI (city-level labels only)

---

## 🗺️ Roadmap (Phased)
1. Foundation: auth, profiles, friends, settings
2. Location: permissions, city detection, home/away
3. Trips: CRUD, lists, overlap detection
4. Notifications: in-app + push
5. Map view (optional if time remains)
6. Beta + privacy review; launch
7. Explore (Discoverable), Activities/Events (opt-in) with strong safety guardrails
8. Dating Mode (opt-in) with verification and rate-limits

---

## 📎 References
- CBS News: Instagram Map privacy concerns → opt-in, limited visibility
- Nomadago: trip calendars and overlap value
- MileAway: social inspiration from friends’ travels
