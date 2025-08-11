Adoreu – Product Requirements Document (PRD)
Last Updated: August 10, 2025
Status: Draft v1.0
Table of Contents
Purpose
User Stories
Minimum Viable Product (MVP) Features
Core Features (Beyond MVP)
Privacy Design
Tech Stack
User Flows
Onboarding & Registration
Profile Creation & Editing
Match Discovery
Match Interaction & Messaging
Growth Strategy
MVP Exclusions
Purpose
Adoreu is a social matchmaking platform designed to help individuals form meaningful romantic connections in a fast-paced digital world. This PRD outlines the vision, features, and requirements for Adoreu, detailing what we aim to build and why.
Problem Statement: Modern dating apps often lead to superficial interactions and privacy concerns. Users seek a safer, more authentic dating experience that prioritizes genuine connections and user privacy.
Solution Overview: Adoreu’s purpose is to create an engaging dating application that fosters authentic connections through thoughtful matching algorithms, user-curated profiles, and respectful communication. We emphasize privacy by design, ensuring users feel secure sharing personal information and engaging on the platform.
Goals & Objectives:
Facilitate high-quality matches by considering compatibility factors beyond looks (e.g., interests, values).
Ensure a smooth user experience from onboarding to daily usage, on both web and mobile.
Build user trust through robust privacy features and transparent data handling.
Launch a functional MVP quickly to gather user feedback and iterate on core features.
User Stories
This section describes key user stories representing the primary needs and scenarios for Adoreu’s target users. Each user story is written from the perspective of a typical end-user (a dater seeking connections):
As a new user, I want to sign up easily (using email, phone, or social login) so that I can quickly start using Adoreu without a complicated registration process.
As a user, I want to create a profile with photos and personal details (age, interests, etc.) so that others can learn about me and I can receive better match suggestions.
As a user, I want to specify my preferences (e.g., age range, location radius, interests) so that Adoreu can show me more relevant potential matches.
As a user, I want to browse through profiles presented one at a time (e.g., a card swipe interface or feed) so that I can focus on each potential match individually.
As a user, I want to indicate interest in someone’s profile (e.g., “like” or swipe right) so that if they are also interested, we form a mutual match.
As a user, I want to receive a notification when a mutual match occurs so that I know when I can start a conversation with someone who’s also interested in me.
As a matched user, I want to exchange messages with my match within the app so that we can get to know each other without sharing personal contact details.
As a user, I want the option to unmatch or block another user if needed, so that I feel safe and in control of my interactions.
As a returning user, I want to edit my profile and preferences at any time so that I can keep my information up-to-date (for example, update photos or change my bio).
As a privacy-conscious user, I want to control what information is visible on my profile (like hiding my last name or precise location) so that I feel secure using the app.
These user stories guide the feature set and help ensure we meet user needs in the initial product and beyond.
Minimum Viable Product (MVP) Features
The MVP represents the first launch version of Adoreu, focusing on essential features that enable the core matchmaking experience. The emphasis is on delivering a usable, delightful experience with minimal scope, to gather user feedback early. MVP Scope – Must-Have Features:
User Onboarding & Authentication:
Simple account creation using email/password or OAuth (e.g., Google, Apple login).
Verification via email or SMS to ensure valid accounts (leveraging Clerk for secure authentication).
Optional onboarding tutorial or welcome screens to guide new users through key features.
User Profile Creation:
Profile setup with basic fields: name (or display name), age, gender, a short bio, and up to 5 photos.
Preference settings: desired age range, distance radius, and gender preference for matches.
Ability to edit profile information and update photos from profile settings.
Match Discovery (Swipe/Explore):
A feed or card-based UI displaying one profile at a time, showing key info (photo, name, age, short bio).
Interaction actions: “Like” (e.g., swipe right or press a heart) to express interest, or “Pass” (swipe left) to skip.
Basic algorithm to serve profiles based on location proximity and stated preferences.
Queue of potential matches refreshes as user swipes, with some rate limiting to prevent swipe spam.
Matching & Notifications:
When two users like each other, a mutual match is created.
Both users are notified in real-time of the new match (push notification on mobile, in-app notification on web).
New matches appear in a “Matches” list for each user.
In-App Messaging:
Matched users can send text messages within the app.
Real-time chat interface for each match (powered by Convex for live updates).
Basic messaging features: text input, send, and read status (optional to include simple read receipts in MVP).
Push notifications for new messages when not actively in the chat.
Safety & Blocking:
Ability for a user to unmatch/block a match, which immediately removes the conversation for both and prevents future contact.
Option to report a profile for inappropriate behavior or content (which flags to the team for review).
Basic Navigation & UI:
Simple, intuitive navigation bar or menu to access primary sections: Explore (swipe), Matches/Chats, and Profile/Settings.
Clean, modern UI design with emphasis on profile content (we will use a minimal design for MVP).
Responsive design on web (Next.js) and a consistent look and feel on mobile (React Native).
Analytics & Logging (Internal):
Basic analytics to track user engagement (sign-ups, number of matches, messages sent).
Error logging and performance monitoring to catch issues early (possibly using simple tools or Convex logs).
Each MVP feature above is critical to delivering the core user experience of Adoreu. Features are kept minimal yet sufficient for users to sign up, find matches, and chat. This will allow us to launch quickly and learn from real user behavior.
Core Features (Beyond MVP)
Core features are planned enhancements and additional capabilities that extend Adoreu beyond the basic matchmaking of the MVP. These may not be present at launch but are considered important for the product’s long-term success and competitive edge. Planned Features for Post-MVP:
Advanced Matchmaking Algorithm: Utilize more sophisticated matching criteria (personality traits, interests, behavior in app). Potential use of machine learning to improve match relevance over time.
Discovery Filters and Search: Allow users to filter or search matches by more profile criteria (education, hobbies, etc.) or browse categories (e.g., most compatible, new users, nearby events).
Premium Subscription & Features: Introduce a premium tier with perks (e.g., see who liked you, more daily likes, profile boosts, ad-free experience) to monetize the platform.
Social/Community Features: Add options like group chats or forums around interests/events (e.g., “Singles who love Hiking”) to drive more engagement beyond one-to-one matches.
Voice and Video Calls: Enable in-app voice calling or video chat between matched users for a richer communication experience before meeting in person, with appropriate privacy safeguards.
Profile Verification: Offer verified badges for users who confirm their identity (via a selfie or ID verification), to increase trust that people are who they say they are.
Safety and Moderation Tools:
AI-assisted content moderation for profile texts and images to filter out inappropriate content automatically.
Enhanced reporting system (with categories and follow-up actions), and a customer support dashboard for handling reports.
Localization & Internationalization: Support multiple languages and regions, adapting matching logic for distance (miles vs kilometers) and cultural nuances in profiles.
Data Insights for Users: Show users some analytics about their profile (e.g., number of appearances in others’ feeds, likes received) to encourage engagement.
Event Integration: In the future, possibly integrate or partner with local events (speed dating, meetups) where users can meet in groups, facilitated via the app.
These core features flesh out the fuller vision for Adoreu. They are slated for development after validating the MVP, ensuring we build the right enhancements based on user feedback and market demand.
Privacy Design
Privacy and security are foundational to Adoreu’s design. Given the sensitive nature of personal data in a dating app, we are committed to privacy by design principles from day one. This section outlines how Adoreu will protect user data and maintain user trust.
Data Minimization: Collect only the data absolutely necessary for matchmaking. For instance, we ask for general location (city or postal code) for proximity matching rather than precise GPS coordinates. No unnecessary personal data will be collected.
Secure Authentication: User authentication is handled via Clerk, which provides secure password storage, OAuth integration, and multi-factor authentication options. Clerk helps ensure that sign-ups and logins are protected and that we do not handle raw passwords directly.
End-to-End Encryption: All communications with the server use HTTPS/TLS. For messaging between users, use Convex’s real-time infrastructure over secure WebSockets; we will explore end-to-end encryption for messages so that even the service provider cannot read message content (this may not be in MVP but is a goal for core security).
Profile and Content Visibility: Users have fine-grained control over what profile information is shared. Last names are optional or abbreviated by default. Exact location or contact info is never displayed publicly. We will not show a user’s online status or last active time in MVP to protect privacy (could be revisited as an opt-in feature later).
Data Storage & Encryption: Sensitive personal data (e.g., authentication tokens, personal info) is stored in Convex with encryption at rest. Convex’s access controls ensure that each user can only read/write their own data or data explicitly shared with them (like messages in their matches).
Privacy Compliance: Adoreu will comply with relevant privacy regulations (e.g., GDPR for EU users, CCPA in California). This includes:
Clearly written privacy policy and terms of service that users must agree to on sign-up.
Providing a way for users to request data deletion or download (account deletion will remove personal data from our systems within a reasonable time frame).
Only users 18+ are allowed (we will include age verification checks during signup to avoid storing data of minors).
Third-Party Services: Carefully vet all third-party integrations (such as Clerk for auth, any analytics or bug tracking tools) to ensure they meet our privacy standards. No third-party will get unnecessary user data. For example, analytics will use anonymized or aggregated data; we won’t share personal profile info with analytics services.
Secure Development Practices: The development team will follow secure coding guidelines. Regular security audits and penetration testing will be conducted, especially before major releases, to catch vulnerabilities.
Incident Response Plan: We design systems assuming breaches can happen. There will be a plan in place to notify users in case of a significant data breach and steps to mitigate damage (like invalidating tokens, requiring password resets via Clerk’s systems, etc.).
By embedding these privacy considerations from the start, Adoreu aims to build user trust and differentiate itself as a platform where users feel safe to share and connect.
Tech Stack
Adoreu’s technology stack is chosen to enable rapid development, scalability, and a seamless cross-platform user experience. The stack centers around modern JavaScript frameworks and services for a unified web and mobile approach:
Next.js (React for Web): Next.js powers the web application, offering server-side rendering for performance and SEO (for any public-facing pages, e.g., a marketing site or web client for the app). It provides a robust framework for building our React-based web UI and routes. We will use Next.js for any web dashboard or future desktop web access to Adoreu’s features.
React Native (for Mobile): We will develop mobile apps for iOS and Android using React Native, allowing us to share a lot of code and UI components across platforms. This choice ensures a consistent experience between the web and mobile, and faster development by using one codebase for both platforms. (If using Expo or a monorepo, it will integrate with our Next.js and backend nicely, though details TBD.)
Convex (Backend-as-a-Service): Convex is our serverless backend and database solution. It provides a real-time data backend with built-in storage, queries, and reactive update capabilities. We’ll use Convex to handle:
Data persistence: Storing user profiles, match data, messages, etc., in Convex’s database.
Server-side logic: Writing Convex functions for match creation logic, feed generation, and any business logic that must run securely (e.g., preventing duplicate likes, handling reports).
Real-time updates: The Convex client will allow instant updates in the UI (e.g., a new message appears in chat without needing a manual refresh).
Convex’s scalability and developer-friendly APIs allow us to focus on product logic without managing our own servers.
Clerk (User Authentication & Management): Clerk is an authentication service that handles sign-ups, logins, password resets, social logins, and user account management out-of-the-box. By integrating Clerk, we get:
Pre-built UI components for login/registration (which we can customize to match Adoreu’s branding).
Secure handling of credentials and session management.
Features like email verification, multi-factor auth, and social OAuth providers with minimal effort.
Clerk will manage our user identities and integrate with Convex (Clerk provides JWTs or tokens we can use to identify the user on Convex’s side securely).
Frontend Framework & UI Library: On both Next.js and React Native, we will use React as the core UI library. We’ll employ a design system for consistency—perhaps a component library like Chakra UI or Tailwind CSS for web, and native-base or custom styled-components for React Native. This ensures a cohesive design across platforms.
State Management: Rely on React’s built-in state and Convex’s reactive queries for most state. We might use a state management library (like Zustand or Redux) if needed for complex local state or offline scenarios, but initially we keep it simple.
Deployment & DevOps:
Web (Next.js) will be deployed on Vercel (leveraging its great compatibility with Next.js for SSR, and automatic CI/CD).
The Convex backend is hosted by Convex’s cloud service, which scales our functions and storage automatically.
Mobile apps (React Native) will be distributed via Apple App Store and Google Play Store; we may use Expo’s build service or EAS for streamlining builds.
We’ll set up a CI pipeline for testing and deploying Convex functions and running automated tests for the frontends.
Testing: Use Jest/React Testing Library for unit and integration tests on the front-end components. For Convex functions, write tests possibly using their testing utilities or a staging environment. End-to-end testing might be done with Detox or Cypress (for the web portion). This ensures we maintain quality as we iterate quickly.
This tech stack was chosen for developer efficiency and scalability. By using a JavaScript/TypeScript stack end-to-end (Next.js, React Native, Convex, Clerk), the team can move fast without context switching, and easily share code (like model definitions or utility functions) between the backend and frontend. The stack should comfortably support the initial user base and can scale as Adoreu grows.
User Flows
In this section, we detail the primary user flows through the Adoreu application. Each flow illustrates how users will navigate key functionalities step-by-step, ensuring the product delivers a cohesive and intuitive experience. The main user flows are:
Onboarding & Registration
Profile Creation & Editing
Match Discovery (Browsing and Liking Profiles)
Match Interaction & Messaging
Each sub-section below outlines the steps in these flows:
Onboarding & Registration
App Launch / Welcome Screen: The user opens Adoreu (mobile app or web). They are greeted with a welcome screen highlighting the app’s value proposition and a clear call-to-action to sign up or log in.
Account Creation Choice: If new, the user taps “Sign Up”. Options are presented for sign-up via email or through OAuth providers (e.g., “Continue with Google”, “Continue with Apple”).
Sign Up Form:
Email/Password: User enters their email and a password (with strength requirements).
OR Social OAuth: User chooses a provider and consents to share basic profile info (Clerk handles OAuth flow).
The user agrees to Terms of Service and Privacy Policy (must check a box before proceeding).
Email Verification: If email/password was used, the user is sent a verification email. They must click the link (or enter a code) before their account is activated. (Clerk manages this flow out-of-the-box.)
Initial Onboarding Questions: After account creation, the user is prompted to enter some basic profile details (if not retrieved from OAuth): name, date of birth (to verify age ≥ 18), gender, and what they are looking for (their match gender preference). They proceed to allow location access or enter their city/ZIP for matchmaking range.
Tutorial (Optional): A brief tutorial may play, showing how to use the swipe interface, how matching works, and tips for safety. This could be a few slides the user can swipe through, with the option to skip.
Completion: On finishing onboarding, the user is taken into the main app, typically to the Profile Creation flow (if profile is incomplete) or directly to the Match Discovery screen with a prompt to finish their profile setup.
Profile Creation & Editing
Profile Prompt: If the user has just signed up or hasn’t completed their profile, they are directed to create their profile. If an existing user wants to edit their profile, they navigate to the “Profile” section and tap an “Edit Profile” button.
Add Photos: The user is asked to upload profile photos. They can choose from their device gallery or take a new photo. The MVP allows up to 5 photos. Each upload is previewed and the user can rearrange or delete photos. (We will integrate with device permissions for camera/gallery in mobile. Images are stored via Convex or possibly a storage like S3 if needed – but Convex can handle binary upload for MVP.)
Basic Info: The user fills out text fields: a short bio (e.g., 280 characters max), job title (optional), education (optional). There are also dropdowns or selection inputs for things like relationship intent (serious, casual, not sure), and key interests from a predefined list (to help matching).
Preferences: In profile settings or during creation, the user sets their match preferences: desired age range slider, distance radius slider, and perhaps a toggle for “show me people of X gender(s)”. These settings are saved to filter their match feed.
Save Profile: The user saves their profile information. The app validates required fields (at least one photo, name, age) and shows confirmation.
View Profile: The user can view their own profile as others would see it, to verify everything looks correct. They can return to edit mode if needed.
Future Edits: At any time, the user can come back to the profile screen to edit information or update photos. Edits are saved and reflected immediately in the data (and will affect what others see if they come across this profile later).
Match Discovery
Accessing Discovery: The user taps on the “Discover” or “Explore” tab. They are presented with the first profile card in their feed of potential matches. The UI typically shows a large photo, with basic info overlay (name, age, maybe one line of bio or distance).
Viewing Profile Details: The user can tap on the profile card to view more details about that person — this might bring up a detailed view with the full bio, more photos (swipeable gallery), and list of interests or other info. The user can swipe back down to return to the card deck.
Liking or Passing:
If the user is interested in the shown profile, they perform the “Like” action (swipe right or tap a Heart/Like button). This action is sent to the backend (Convex function records that User A liked User B).
If not interested, user swipes left or taps an “X”/Pass button. This skips the profile, and it won’t be shown to the user again in the near future.
Feedback & Next Card: After a like or pass, the next profile card animates in. If the user liked someone who has already liked them earlier (match!), a special UI is shown (e.g., “It’s a Match!” screen with both profiles) indicating a successful match. From that screen, the user can choose to start a chat immediately or continue browsing.
Out of Profiles: If the user reaches the end of available profiles (based on their preferences and who’s nearby), show a message like “You’ve seen all potential matches in your area. Try expanding your preferences or check back later.” Possibly include an option to broaden search or invite friends to join (to increase pool).
Refreshing & New Profiles: The feed is updated continuously as new users join or existing users come into range. The user can pull-to-refresh the stack if it appears stagnant (Convex can serve new candidates if available). There may be a rate-limit (e.g., only 100 swipes per 12 hours for MVP to prevent bot-like behavior and encourage thoughtful swiping).
Match Interaction & Messaging
Match List: The user navigates to the “Matches” or “Messages” tab. They see a list of all current matches (usually showing the match’s name, photo, and maybe last message snippet if any). New matches (unopened chats) might be highlighted.
Opening a Chat: The user taps on a particular match in the list to open the messaging interface for that match. The top of the chat screen shows the match’s name and maybe a thumbnail of their photo for context.
Sending Messages: The user types a message into a text input field and hits send. The message instantly appears in the conversation view (using Convex’s real-time updates). The other user’s app will also receive the message in real-time (if they are online, it appears; if offline, they get a push notification).
MVP supports plain text messages. (Emoji are supported via the device keyboard. No images or other attachment types in MVP.)
The system can show simple status like “Sent” or “Delivered”. Read receipts (showing when the other user has seen the message) might be deferred until later versions for simplicity.
Receiving Messages: When the other user responds, their message pops into the chat view in real-time. If the current user is not actively in the chat, a notification is shown.
Notifications: Users get push notifications on their phone (or web notifications if enabled on desktop) for new messages and new matches. Tapping the notification takes them directly to the relevant chat or match screen. (This relies on integrating with FCM/APNs for mobile, and browser notification APIs for web).
Unmatching/Blocking in Chat: If a conversation goes badly or the user is no longer interested, they can open a menu in the chat to unmatch or block. A confirmation dialog appears (“Are you sure you want to unmatch? You will lose this conversation.”). If confirmed, the match is removed: the chat is deleted from both users’ lists and they can no longer message each other.
Logging Out: If the user wants to log out (for example, on a shared device), they can do so from a settings screen. Clerk will handle the session termination. The next time the app is opened, they’ll see the login screen again.
Each of these flows will be refined through user testing. The above steps ensure that from first use to regular engagement, users have a clear and straightforward journey in Adoreu. (Potential image placeholders for user flow diagrams could be inserted here if available, e.g., a flowchart of the onboarding process or a state diagram of matching. For now, these are documented in text.)
Growth Strategy
Adoreu’s growth strategy focuses on acquiring an initial user base and encouraging viral, organic expansion. As a matchmaking platform, network effects are crucial — the app becomes more valuable as more people in a given area join. Below are the strategies for initial launch and sustained growth:
Targeted Launch & Niche Focus: We plan to launch Adoreu in a specific geographic region or community to ensure a critical mass of users. For example, start with a major city or a university campus where early adopters are concentrated. By focusing on a niche (geographically or demographically), we increase the chances that new users find matches quickly (improving early retention and word-of-mouth).
Referral Program: Implement an in-app referral system where users can invite friends and get rewards. For instance, a user shares a personal referral link; for each friend who joins and completes a profile, both the referrer and referee get a perk (e.g., a month of premium features free, once those exist, or a special badge). This leverages existing social circles to drive adoption.
Social Media Presence & Content Marketing: Create engaging social media profiles (Instagram, TikTok, Twitter) for Adoreu, sharing dating tips, success stories, and app feature highlights. Content marketing (blog posts on modern dating, how Adoreu differs, etc.) will help build organic interest and SEO for our landing page.
Influencer and Partnership Campaigns: Partner with influencers in the lifestyle/relationship space who can promote Adoreu to their followers. For example, collaborate with a local Instagram influencer or a dating coach to mention Adoreu. We can also sponsor events (like singles events, meetups) or partner with organizations (e.g., alumni associations, community groups) for co-promotions.
Waitlist & Hype (Pre-Launch): Before the app is widely available, have a landing page where interested users can join a waitlist by entering their email (perhaps gamified: move up the waitlist by inviting others). This creates excitement and a pool of eager users at launch day.
Focus on Women’s Safety & Comfort: One key to growing a dating app is ensuring it’s friendly and safe, especially for women users (as they often drive the community health and engagement). Adoreu will highlight its safety features and moderation in marketing. A positive, respectful community will attract more users via word-of-mouth (people recommending it as a better alternative to existing apps).
Local Events & Promotions: Post-launch, organize or participate in local events such as “Adoreu Meet & Mingle” nights where users can meet offline in a safe, fun environment. This not only strengthens the community but also generates local press coverage.
Continuous Improvement & Engagement: Use analytics to understand user behavior and drop-off points. Run A/B tests on onboarding or other flows to improve conversion. Happy users who find good matches are the best marketing; we’ll encourage successful pairs to share their stories (with consent) as testimonials. We will iterate on features that keep users engaged even when they’re not actively looking (like the community features post-MVP) so that the app stays sticky.
Scaling Infrastructure with Growth: As growth strategies bring in new users, we’ll ensure our tech (Convex backend, etc.) scales smoothly. Performance and reliability are part of growth too; if the app is slow or buggy under load, users will churn. Thus, we plan capacity and have engineers on-call especially during big pushes or campaign launches.
By executing these strategies, Adoreu aims to achieve a healthy growth curve: starting with a strong core community, leveraging network effects, and expanding region by region. Marketing efforts will be tuned based on what channels show the best results in acquiring active users (not just installs). The ultimate goal is to reach a self-sustaining growth loop where user referrals and word-of-mouth drive continuous adoption alongside our marketing efforts.
MVP Exclusions
It’s important to clarify which features or aspects will NOT be included in the MVP, to maintain focus and avoid scope creep. Below is a list of intentional exclusions for the initial version of Adoreu:
Advanced Match Filters: The MVP will not include complex filters such as filtering by religion, political views, height, etc. Only basic preferences (age, distance, gender) are in scope. Advanced filtering can be considered later based on user feedback.
In-App Video/Voice Calls: Real-time video or voice calling between users is excluded from MVP. These features require additional development and moderation effort. In MVP, if users want to move to a call, they must exchange contact info off-platform (which we do not facilitate within the app for privacy reasons).
Monetization & Payment Features: The initial release will have no paid subscriptions, in-app purchases, or ads. MVP is free for all users. Any “premium” features or revenue-generating aspects (like a paid boost or subscription) will be added only after validating user engagement.
Third-Party Social Integration: MVP won’t integrate deeply with other social media (e.g., you cannot link your Instagram or Spotify to show on your profile in this version). Profiles are kept simple to start. Such integrations might be added in future to enrich profiles or for login purposes, but are not core to initial matchmaking.
Web Client Full Functionality: While Next.js is part of the stack, the primary MVP experience is optimized for mobile (via React Native app). A responsive web version might be limited or even just a landing page at MVP. A fully functional web app (beyond basic browsing or messaging) is out of scope if it risks delaying launch. Our assumption is that most early users will prefer a mobile app experience.
Comprehensive Settings & Account Management: Only essential settings are included in MVP (e.g., edit profile, notification toggles, logout). More intricate settings (like downloadable data, advanced notification customization, account pause feature, etc.) will be handled later as needed.
Scaling for Massive User Load: While we choose scalable tech, we are not initially building for millions of users. Some optimizations (like heavy load testing, multi-region deployments, advanced caching strategies) are deferred until we actually need them. MVP is aimed at a modest user base (e.g., a single city’s worth of users in the low tens of thousands).
UI Polish and Animations Beyond Basics: The MVP will have a clean design, but not an excessive amount of custom animation or perfect polish on every pixel. For example, swipe cards will have basic animations, but we might skip fancy effects or haptic feedback until later. The focus is on functionality and clarity first.
Extensive Onboarding Questionnaire: Some dating apps ask dozens of questions to gauge personality for matching. Adoreu MVP will not include a lengthy quiz or personality test in the onboarding. We keep sign-up quick. More profile depth or questionnaires could come later (or as optional fun questions in profiles).
Multi-Language Support: MVP will launch in English only. We won’t include other languages or region-specific content until we expand to those markets. Internationalization will be planned post-MVP.
By explicitly listing MVP exclusions, we ensure all stakeholders understand the boundaries of the first release. This helps manage expectations and keeps the team focused on delivering the most critical features on time. Features not in MVP can be scheduled for future iterations once we have validated the core product.