# Adoreu — Social Travel Platform (PRD v2)

*Last Updated: **August 20, 2025***
*Status: **Draft v2.0***

## Changelog (v2 vs. prior dating-app PRD)

* **Repositioned** Adoreu from a dating-only app to a **social travel** platform.
* **Map-first** experience with **city‑level presence** (not precise GPS by default).
* **Friends & Groups** over swipes: create, discover, and join groups and meetups.
* **AI recommendations** for activities, plans, and intros.
* **Safety/Privacy by design** for travelers (especially women) with consent‑gated discovery and robust moderation.
* **Cross‑platform** focus on **React Native + Convex + Clerk** (web is landing/admin initially).

---

## One‑liner & Positioning

**Adoreu is a social travel platform to see friends on a map (city‑level), meet new people, form groups, and get AI‑powered activity recommendations while traveling.**

Adoreu emphasizes **privacy, consent, and safety**. It’s not a swipe app; it’s a **contextual travel network** for spontaneous, respectful, real‑world connection.

---

## Table of Contents

1. Purpose & Goals
2. Key Concepts & Glossary
3. Personas
4. User Stories
5. MVP Scope (Must‑Haves)
6. Post‑MVP / Core Features
7. Safety, Trust & Privacy by Design
8. Tech Stack & Architecture
9. Data Model (initial Convex schema)
10. Feature Specs & UX Flows
11. Moderation & Community Guidelines
12. Analytics, Metrics & KPIs
13. Growth Strategy
14. Rollout Plan & Milestones
15. MVP Exclusions
16. Risks & Mitigations
17. Open Questions

---

## 1) Purpose & Goals

**Purpose.** Help travelers:

* See **which friends are in the same city** (or will be soon) without exposing precise location.
* **Meet new friends** through opt‑in discovery and group meetups.
* **Plan and join activities** easily using **AI suggestions** tuned to time, weather, budget, and group composition.

**Goals.**

* Deliver a **map‑first** social experience with **city‑level presence** (e.g., “Itay is in Lisbon”).
* Make **group formation effortless** ("we’re 2 guys looking for 2 more for tacos"—with safety & consent rules).
* Provide **AI planning**: activity packs, itineraries, intros, “fill my group” suggestions.
* Ship a focused **MVP** quickly on **React Native + Convex + Clerk**; iterate from real usage.

---

## 2) Key Concepts & Glossary

* **Presence**: A user’s **city‑level** status (e.g., “In Barcelona”, or “Home”). No default GPS precision; users may optionally share precise meeting spots **inside** groups/meetups.
* **Circle**: Your friend/follow graph (mutual friends by default). Circles control what presence others can see.
* **Trip**: A time‑bounded presence (future or current). Example: “Berlin, Aug 22–27.”
* **Group**: A temporary or persistent set of users formed around an activity or interest (e.g., “Sunset surf 4p, need 2 more,” “Veggie food crawl”). Groups can have **composition preferences** (size, experience level, mixed‑gender, women‑only, etc.), always within community and anti‑harassment policies.
* **Meetup**: A scheduled, concrete plan within a group (time/place). Precise location is revealed **only** to group members.
* **Hub**: City feed of public groups/meetups and tips.
* **AI Copilot**: On‑device/in‑app assistant that recommends activities, composes intros, builds itineraries, and helps fill groups.

---

## 3) Personas

* **Solo Traveler (Amit, 27)**: Wants low‑friction ways to find safe group activities and meet friendly locals.
* **Friends on a Trip (Dana & Yuval, 24)**: Want to see who else is around and quickly find/join fun group plans.
* **Local Connector (Noa, 31)**: Enjoys hosting city activities (runs, food tours) and meeting travelers.
* **Safety‑First Traveler (Rina, 25)**: Prioritizes women‑only groups, strict privacy, and clear reporting tools.

---

## 4) User Stories

**Presence & Trips**

* As a user, I can set my **current city** or plan **future trips** so friends can see I’ll be around.
* As a privacy‑conscious user, I control **who** sees my presence (friends, friends‑of‑friends, groups only, or nobody).

**Map & Discovery**

* As a traveler, I see a **map of cities** where my friends are now or soon.
* As a traveler, I browse a **city hub** to discover public groups/meetups.

**Groups & Meetups**

* As a user, I can **create a group** with an activity, time window, and **composition preferences** (e.g., “total 4, any gender,” “women‑only running group”).
* As a user, I can **request to join** a group and chat after acceptance.
* As a group host, I can **approve/decline** join requests and mark the group as **Full**.

**AI**

* As a user, I can ask **AI** to recommend activities **now/tonight/this weekend**, tuned to city, time, weather, budget, interests, and group size.
* As a group host, I can ask **AI** to **fill my group** by drafting an inviting post and suggesting hashtags and the right hub visibility.

**Safety & Control**

* As a user, I can **block or report** another user or group.
* As a woman traveler, I can **limit discovery** to women‑only groups, disable DMs from strangers, and hide presence except to my circle.

---

## 5) MVP Scope (Must‑Haves)

### Platform

* **Mobile**: React Native app (iOS/Android). Expo/EAS builds.
* **Auth**: Clerk (email, Apple, Google). 18+ age gate.
* **Backend**: Convex for data, functions, and real‑time.
* **Notifications**: Push (FCM/APNs). In‑app inbox.

### Presence & Trips

* Set **Home City** during onboarding.
* Create **Trip** with city + dates (future or current). Toggle **visibility** (Friends only / Friends of Friends / Public Hub / Private).
* **City‑level map** with friend avatars clustered by city (no live dots on streets in MVP).

### Friends & Circles

* **Mutual follow** to become friends (request/accept).
* Control who can see your presence (per audience setting).

### Groups & Meetups

* **Create Group**: name, description, tags, city, date/time window, capacity (min/max), **composition preferences** (simple presets: “any,” “mixed,” “women‑only,” “beginners‑welcome,” etc.).
* **Discover Groups**: city hub list with filters (date, tags, capacity).
* **Join Requests** with brief intro (text). Host approves/declines.
* **Group Chat** (text, emoji). Precise meetup address revealed **only** after join.

### AI Copilot (MVP‑light)

* **Activity Suggestions**: Given city, time window, budget, weather (when available), and interests → return 3–7 ideas with short descriptions and map areas (neighborhood‑level).
* **Post Drafting**: Turn a plain idea (“tacos tonight, need 2 more”) into a clear group post with tags.

### Safety & Moderation

* **Report & Block** users/groups.
* **Host controls**: remove member, mark full.
* **Content filters**: basic profanity/NSFW text filter; image upload delayed to post‑MVP.
* **Consent & visibility** defaults skew **private** (Friends‑first, public hub is opt‑in).

### Basic UX & Nav

* Tabs: **Map**, **Hub**, **Groups**, **Inbox**, **Me**.
* Simple, friendly design; RTL support for Hebrew (fonts & mirroring).

### Analytics & Logging

* Signups, DAU/WAU, trip creation rate, presence opt‑in rate, groups created, join attempts, approvals, first‑day group join, retention D1/D7/D30.

---

## 6) Post‑MVP / Core Features

* **Richer AI**: dynamic itineraries; weather & events awareness; translation; safety tips; restaurant bookings via partners.
* **Events**: city events calendar + RSVP.
* **Recommendations Graph**: people‑you‑may‑know; group suggestions by shared interests.
* **Verifications**: selfie / ID‑light verification → trust badges.
* **Media in Chat**: images, pinned meet locations.
* **Payments**: cost‑split or ticketing for paid activities.
* **Reputation**: lightweight post‑event reactions (“chill”, “reliable host”).
* **Web App**: browse hubs, manage trips/groups, admin tools.

---

## 7) Safety, Trust & Privacy by Design

* **Default city‑level presence** only; precise locations are shared **only** inside accepted groups/meetups.
* **Visibility Controls** at creation time for trips and groups (Friends / FoF / Hub / Private link).
* **Women‑only & other protected spaces** respected. Clear policies against harassment, hate speech, or discrimination.
* **No minors** (18+), age gate via Clerk.
* **Block/Report** from profiles, group cards, and chat.
* **Rate limits** for posts/requests to deter spam.
* **Transport Security**: TLS; secrets managed via platform best practices.
* **Data**: PII minimized; encrypted at rest via Convex; access control via user IDs and membership.
* **Location**: store **city/administrative area** for presence; optional precise venue stored **only** at meetup scope.
* **Incident Response**: internal runbook; token invalidation; comms template.

---

## 8) Tech Stack & Architecture

* **Mobile**: React Native (Expo). TypeScript. RN Map library (MapLibre GL/Mapbox).
* **Auth**: Clerk (email/Apple/Google), JWT to Convex.
* **Backend/Data**: Convex (functions, tables, real‑time watchers). File storage TBD (Convex files or S3) post‑MVP.
* **Notifications**: Expo Notifications (FCM/APNs) → device tokens stored in Convex.
* **AI**: server function wrapper (Convex action) calling model provider(s) for recommendations and drafting.
* **Web**: Next.js (landing + admin console) post‑MVP.

**High‑level flow**

* Client authenticates via Clerk → obtains token → calls Convex.
* Convex enforces ACLs: presence visible per audience, group membership gates chat and meetups.
* AI actions run server‑side with rate limiting and safety filters.

---

## 9) Data Model (initial Convex schema)

*(Names are indicative; finalize in implementation.)*

**users**

* id, clerkUserId, createdAt
* displayName, handle, bio, avatarUrl
* homeCity, languages\[], interests\[]
* settings: { presenceVisibilityDefault, dmFromStrangers: boolean }

**friends**

* userId, friendUserId, status: "requested"|"accepted"|"blocked"
* createdAt, updatedAt (index both directions)

**trips**

* id, userId, city, country, startDate, endDate
* visibility: "friends"|"fof"|"hub"|"private"
* isCurrent: boolean

**presence** (derived or denormalized from current trip)

* userId, city, country, status: "home"|"travel"
* visibility (snapshot from trip)
* updatedAt

**groups**

* id, hostUserId, city, country
* title, description, tags\[]
* windowStart, windowEnd
* capacityMin, capacityMax
* composition: { preset: "any"|"mixed"|"womenOnly"|"beginnersWelcome", notes? }
* visibility: "friends"|"fof"|"hub"|"private"
* status: "open"|"full"|"closed"
* createdAt

**group\_members**

* groupId, userId, role: "host"|"member"
* joinStatus: "pending"|"approved"|"declined"|"removed"
* introText, createdAt

**meetups**

* id, groupId
* title, description
* startTime, endTime
* venueLabel (neighborhood or exact for members)
* exactLatLng (members‑only scope)

**messages**

* id, groupId, userId, content, createdAt

**reports**

* id, reporterUserId, subjectType: "user"|"group"|"message", subjectId, reason, details, createdAt, status

**notifications**

* id, userId, type, payload, isRead, createdAt

**ai\_requests**

* id, userId, type: "activitySuggest"|"postDraft"|..., inputHash, createdAt

Indexes: by city, by visibility, by dates for trips/groups/meetups; friendship pair indices.

---

## 10) Feature Specs & UX Flows

### Onboarding

* Clerk sign‑in (18+). Set **display name**, **home city**, **interests**.
* Privacy defaults explained (city‑level presence). Toggle: show presence to **Friends** by default.

### Map (Presence)

* **Map tab** shows your **friends’ cities** with counters (e.g., “3 friends in Budapest”). Tap to see who (respecting your audience settings).
* CTA: “Plan a Trip” → create trip.

### City Hub

* List of **public groups** and **upcoming meetups** for the selected city.
* Filters: date/time, tags, capacity, women‑only.

### Create Group

* Form: title, description, tags, city, windowStart/end, capacity (min/max), composition preset, visibility.
* AI assist: suggest catchy title, tags, and short description.
* Submit → group card appears in hub (if visibility allows).

### Join Group

* Tap group → details. Request to join with a 200‑char intro.
* Host sees requests; approve/decline. Upon approval → joins **group chat**; precise meetup info unlocked.

### AI Activity Suggestions

* Prompt: city + time window + budget + interests (+ optional group size).
* Output: 3–7 suggestions with short copy, neighborhood names, rough durations, and accessibility notes.
* Action: “Create Group from Suggestion.”

### Chat

* Group chat (text, emoji). System messages for joins/leaves and meetup updates.

### Safety

* Block/report on profiles, groups, and messages. Quick reason menu.
* Women‑only groups enforced at join time (host + system checks).

---

## 11) Moderation & Community Guidelines (MVP)

* **No harassment, hate, threats, or sexual aggression.**
* **Consent first**: No unsolicited DMs; group join is consent gate.
* **Protected spaces** (e.g., women‑only) must be respected.
* **No minors.**
* **No illegal activity or solicitation.**
* **Three‑strike policy** with fast bans for severe violations.
* **Text filter** for slurs/profanity; rate limit new accounts.

---

## 12) Analytics, Metrics & KPIs

* **Activation**: % onboarding completed, presence enabled, first trip created.
* **Social Graph**: friend requests sent/accepted.
* **Engagement**: groups created per user, join rate, time to first approved join, D1/D7 retention.
* **Conversion to IRL**: meetups scheduled per active user, attendance confirmations.
* **Safety**: report rate, time‑to‑action, blocks per 1k users.
* **AI**: suggestion usage rate, create‑from‑AI conversion.

---

## 13) Growth Strategy

* **City‑by‑city** rollout; seed with local hosts and micro‑communities (hostels, uni groups, co‑working).
* **Referral links**: unlock early access / badges.
* **Women‑first safety** messaging; partnerships with safe‑travel orgs.
* **UGC playbooks**: city tips threads; creator partnerships.
* **Travel calendar** prompts (summer breaks, holidays).

---

## 14) Rollout Plan & Milestones

* **P0 (2–3 wks)**: Clickable prototype; Convex schema; basic auth; mock data; map & hub lists.
* **P1 (4–6 wks)**: Trips/presence; create group; join requests; group chat; AI draft/suggestions v1; push.
* **P2 (2–4 wks)**: Safety polish; rate limits; basic moderation tools; Hebrew RTL pass; closed beta in **Tel Aviv** + 1 travel city (e.g., Athens).
* **P3**: Public TestFlight/Play alpha; iterate on AI + discovery; light admin console.

---

## 15) MVP Exclusions

* Precise real‑time location on map (outside groups).
* Payments/ticketing & cost‑splits.
* Voice/video calls.
* Media/file sharing in chat.
* Complex identity verifications (post‑MVP light selfie badge only).
* Deep social integrations (IG/Spotify).
* Advanced recommendation graphs.

---

## 16) Risks & Mitigations

* **Safety incidents** → strict policies, fast reporting, visible enforcement.
* **Ghost cities** (low liquidity) → targeted seeding, host incentives, referral boosts.
* **Spam** → rate limits, friction on first posts, trust scores.
* **Scope creep** → guardrails via MVP checklists and metrics‑driven iteration.

---

## 17) Open Questions

1. Composition presets: keep minimal in MVP (any/mixed/women‑only/beginners) or add more?
2. Should we allow **friends‑of‑friends** map visibility at launch or keep it friends‑only?
3. AI provider(s) and cost controls; on‑device caching for repeat suggestions?
4. Do we need minimal **photo upload** in MVP (avatars only) vs. deferring media entirely?
5. Which two launch cities after Tel Aviv (domestic vs. near‑abroad)?

---

## Appendix: Example Convex Functions (pseudo)

* `createTrip({ city, startDate, endDate, visibility })`
* `listCityHub({ city, dateRange, tags, visibilityScope })`
* `createGroup({ title, city, window, capacity, composition, visibility })`
* `requestJoinGroup({ groupId, intro })`
* `reviewJoinRequest({ groupId, requestId, approve })`
* `postMessage({ groupId, content })`
* `aiSuggestActivities({ city, window, budget, interests, groupSize })`
* `report({ subjectType, subjectId, reason, details })`

> This PRD is intentionally **map‑first, group‑centric, and privacy‑forward**, aligned with **React Native + Convex + Clerk** for rapid delivery and iteration.
