# Map Feature - Product Requirements Document

## Executive Summary

### Feature Overview
The Map feature is the central discovery and connection hub of Adoreu, enabling travelers to visualize their social travel network in real-time. It combines location-based social discovery with activity coordination, allowing users to see where their friends are, discover activities, and spontaneously connect with other travelers.

### Value Proposition
- **For Solo Travelers**: Instantly discover who's around and what's happening nearby
- **For Social Groups**: Coordinate meetups and activities in real-time
- **For Activity Hosts**: Reach travelers actively looking for experiences
- **For All Users**: Transform travel from isolated experiences to connected adventures

### Key Objectives
1. Enable real-time discovery of friends and activities in the user's vicinity
2. Facilitate spontaneous meetups and activity joins
3. Create a visual, intuitive interface for travel social networking
4. Reduce the friction between discovery and action

### Success Metrics
- **Engagement**: >60% DAU open map feature
- **Discovery**: Average 5+ activities viewed per session
- **Conversion**: >15% activity view-to-join rate
- **Social**: 3+ friend connections made per trip
- **Retention**: 80% of users who join an activity return to the app

---

## User Stories & Personas

### Primary Personas

#### 1. Solo Explorer (Sarah, 28)
*Digital nomad traveling through Southeast Asia*
- **Needs**: Find people to explore with, discover local experiences
- **Pain Points**: Loneliness, missing out on group activities, safety concerns
- **User Story**: "As a solo traveler, I want to see which of my friends or friends-of-friends are nearby so I can meet up spontaneously"

#### 2. Social Coordinator (Mike, 32)
*Organizing activities for his travel group*
- **Needs**: Coordinate group activities, find interesting experiences
- **Pain Points**: Difficulty organizing everyone, finding activities that suit the group
- **User Story**: "As a group coordinator, I want to create and share activities on the map so others can join us"

#### 3. Experience Seeker (Lisa, 24)
*Adventure traveler looking for unique experiences*
- **Needs**: Discover authentic local activities, meet like-minded travelers
- **Pain Points**: Tourist traps, activities not matching her interests
- **User Story**: "As an experience seeker, I want to filter activities by my interests and see which ones my friends recommend"

### Key User Journeys

#### Journey 1: Spontaneous Meetup
1. User opens map while exploring a new city
2. Sees friend marker 10 minutes away
3. Taps friend marker to see their status
4. Sends quick "Want to grab coffee?" message
5. Friend accepts, map shows directions to meetup spot

#### Journey 2: Activity Discovery & Join
1. User opens map in the evening
2. Applies "Tonight" + "Nightlife" filters
3. Sees clustered activity pins in entertainment district
4. Taps cluster to expand activities
5. Selects "Rooftop Bar Meetup" from list
6. Views activity details and attendees
7. Joins activity with one tap
8. Receives directions and chat access

#### Journey 3: Creating an Activity
1. User plans a morning hike
2. Long-presses map to drop pin at trailhead
3. Creates activity with details
4. Sets visibility (friends/friends-of-friends/public)
5. Activity appears on map for others
6. Receives join notifications

---

## Functional Requirements

### Map Component

#### Core Features
1. **Interactive Map Display**
   - React Native Maps integration with Google Maps
   - Smooth pan, zoom, and rotation gestures
   - Current location with accuracy indicator
   - Compass and location buttons
   - Map style: Custom travel-themed with muted colors

2. **Friend Markers**
   - Real-time location (updated every 2-5 minutes when active)
   - Profile photo thumbnails
   - Status indicators (green: available, yellow: busy, gray: offline)
   - Last seen time for offline friends
   - Tap for quick profile preview
   - Privacy-respecting (only show if mutual permission)

3. **Activity Pins**
   - Category-based icons and colors
   - Attendee count badges
   - Time indicators (starting soon, ongoing, upcoming)
   - Clustering for dense areas with count
   - Animation for new/trending activities

4. **Map Controls**
   - Expand button (bottom-right) for fullscreen
   - Filter chips (top of map)
   - Search bar (top) with location/activity search
   - Layer toggle (friends/activities/both)
   - Recenter button

5. **Smart Clustering**
   - Group nearby activities when zoomed out
   - Show count and preview of types
   - Smooth expansion animation on tap
   - Priority showing for friends and joined activities

### List Component

#### Core Features
1. **Activity Feed**
   - Vertical scrollable list (40% of screen height)
   - Pull-to-refresh for latest activities
   - Infinite scroll with pagination
   - Smooth scroll-to-item when map pin tapped

2. **Filter Tabs**
   - **All Activities**: Everything in visible map area
   - **Suggested**: ML-based recommendations
   - **Friends' Activities**: Activities with friends attending/hosting
   - Quick filter chips below tabs (Tonight, Tomorrow, This Week)
   - Category filters (Adventure, Food, Nightlife, Culture, etc.)

3. **Activity Cards**
   - Hero image or category illustration
   - Title and brief description
   - Host name and rating
   - Time and duration
   - Distance from current location
   - Attendee avatars (up to 5 + count)
   - Price (if applicable)
   - Quick join button
   - Save for later button

4. **List-Map Synchronization**
   - Selecting item in list highlights on map
   - Map bounds change updates list content
   - Filters apply to both views simultaneously
   - Smooth transitions between states

### Interaction Flows

#### Map to Detail Flow
1. **From List**:
   - Tap activity card
   - List slides down, revealing expanded card
   - Map smoothly zooms to activity location
   - Pin pulses to indicate selection
   - Action buttons appear (Join, Share, Save)

2. **From Map**:
   - Tap activity pin
   - Pin enlarges with preview bubble
   - List auto-scrolls to corresponding card
   - Tap preview bubble for full details
   - Swipe down to return to list view

#### Expand/Collapse Map
1. **Expand** (via button or swipe up):
   - Map grows to 100% height
   - List minimizes to bottom sheet (shows 1 card)
   - Floating filter pills appear
   - More detailed pins shown

2. **Collapse** (swipe down or button):
   - Return to 60/40 split
   - Maintain current center point
   - Preserve selected filters

#### Real-time Updates
1. **Friend Movement**:
   - Smooth position interpolation
   - Status changes with toast notification
   - New friends appear with subtle animation

2. **Activity Updates**:
   - New activities pulse on appearance
   - Attendee count updates live
   - "Starting soon" notifications for saved activities
   - Removed activities fade out

---

## Technical Specifications

### Architecture

#### Component Structure
```
MapScreen/
├── MapContainer/
│   ├── MapView (React Native Maps)
│   ├── FriendMarkers/
│   ├── ActivityPins/
│   ├── MapControls/
│   └── ClusterManager/
├── ActivityList/
│   ├── FilterTabs/
│   ├── ActivityFeed/
│   ├── ActivityCard/
│   └── EmptyState/
├── DetailSheet/
│   ├── ActivityDetails/
│   ├── AttendeeList/
│   └── ActionButtons/
└── Providers/
    ├── LocationProvider
    ├── ActivityProvider
    └── MapStateProvider
```

#### Data Flow
1. **Location Services**:
   - Request permission on first use
   - Background location updates (with consent)
   - Geofencing for activity notifications
   - Battery-optimized tracking

2. **Real-time Sync (Convex)**:
   - WebSocket connection for live updates
   - Optimistic UI updates
   - Offline queue for actions
   - Conflict resolution for simultaneous edits

3. **State Management**:
   - Map bounds and zoom level
   - Selected filters and activity
   - User location and permissions
   - Friend locations and statuses
   - Activity data and attendees

### Performance Requirements

#### Loading Performance
- **Initial Load**: <2 seconds to interactive map
- **Location Fix**: <3 seconds for accurate position
- **Activity Data**: <1 second for visible area
- **Friend Updates**: <500ms for position changes

#### Runtime Performance
- **Frame Rate**: Maintain 60fps during pan/zoom
- **Memory**: <150MB for typical session
- **Battery**: <5% drain per hour of active use
- **Network**: <1MB data per 10 minutes

#### Optimization Strategies
1. **Map Optimizations**:
   - Lazy load off-screen markers
   - Progressive detail loading based on zoom
   - Tile caching for offline support
   - Debounced bound change events

2. **List Optimizations**:
   - Virtual scrolling for large lists
   - Image lazy loading and caching
   - Memoized card components
   - Paginated data fetching

3. **Data Optimizations**:
   - GraphQL/partial data fetching
   - Client-side caching with TTL
   - Delta updates for positions
   - Compressed WebSocket messages

---

## UI/UX Specifications

### Layout Specifications

#### Portrait Mode (Default)
```
┌─────────────────────┐
│    Status Bar       │
├─────────────────────┤
│   Search Bar        │ 40px
├─────────────────────┤
│                     │
│                     │
│     MAP VIEW        │ 60%
│                     │
│                  [⤢]│ (expand button)
├─────────────────────┤
│ All | Suggested |.. │ 48px (tabs)
├─────────────────────┤
│  [Tonight][Food]... │ 36px (filters)
├─────────────────────┤
│                     │
│   Activity List     │ 40% minus tabs
│                     │
└─────────────────────┘
```

#### Landscape Mode
- Map: 70% width (left)
- List: 30% width (right)
- Filters as floating pills

#### Expanded Map Mode
- Map: 100% with floating controls
- List: Collapsed to bottom sheet (peek height: 100px)
- Swipe up to reveal list

### Visual Design

#### Color Palette (from Design System)
- **Primary Actions**: Ocean Blue (#1E88E5)
- **Activity Categories**:
  - Adventure: Green (#10B981)
  - Food: Orange (#F97316)
  - Nightlife: Pink (#EC4899)
  - Culture: Purple (#8B5CF6)
  - Relaxation: Cyan (#06B6D4)
- **Status Indicators**:
  - Available: Green (#10B981)
  - Busy: Orange (#F97316)
  - Offline: Gray (#9CA3AF)

#### Typography
- **Map Labels**: SF Pro Display Medium 14px
- **Card Titles**: SF Pro Display Semibold 16px
- **Body Text**: SF Pro Text Regular 14px
- **Distances**: SF Pro Text Regular 12px

#### Animations
- **Pin Drop**: Bounce effect (300ms)
- **Cluster Expand**: Spring animation (400ms)
- **Card Selection**: Scale + shadow (200ms)
- **Map Zoom**: Smooth ease-in-out (500ms)
- **List Scroll**: Native iOS/Android behavior

### Interaction Patterns

#### Gestures
- **Pinch**: Zoom map
- **Pan**: Move map
- **Tap**: Select item
- **Long Press**: Drop pin / Create activity
- **Swipe Up**: Expand map
- **Swipe Down**: Collapse map / Dismiss detail
- **Pull Down**: Refresh list

#### Feedback
- **Haptic**: Light tap on selection
- **Visual**: Ripple effect on Android, highlight on iOS
- **Audio**: Subtle sound for join action (optional)

---

## Data Requirements

### Data Models

#### UserLocation
```typescript
interface UserLocation {
  userId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  status: 'available' | 'busy' | 'offline';
  visibility: 'friends' | 'fof' | 'public' | 'private';
  city?: string;
  country?: string;
}
```

#### Activity
```typescript
interface Activity {
  id: string;
  hostId: string;
  title: string;
  description: string;
  category: ActivityCategory;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    venue?: string;
  };
  startTime: number;
  endTime: number;
  maxAttendees?: number;
  currentAttendees: string[];
  price?: number;
  currency?: string;
  images?: string[];
  visibility: 'friends' | 'fof' | 'public';
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}
```

#### MapState
```typescript
interface MapState {
  center: { latitude: number; longitude: number };
  zoom: number;
  bounds: MapBounds;
  selectedActivity?: string;
  filters: {
    categories: ActivityCategory[];
    timeRange: 'now' | 'tonight' | 'tomorrow' | 'week';
    friendsOnly: boolean;
    priceRange?: { min: number; max: number };
  };
  visibleLayers: {
    friends: boolean;
    activities: boolean;
  };
}
```

### API Requirements

#### Endpoints
1. **GET /map/activities**
   - Query: bounds, filters, userId
   - Returns: Activity[] with pagination

2. **GET /map/friends**
   - Query: userId, bounds
   - Returns: UserLocation[] (with privacy filtering)

3. **POST /activities**
   - Body: Activity creation data
   - Returns: Created activity

4. **WebSocket /map/updates**
   - Subscribe to real-time updates
   - Channels: friends, activities, notifications

### Privacy & Security

#### Location Privacy
1. **Permission Levels**:
   - Precise: Exact location for close friends
   - Approximate: City-level for others
   - Hidden: No location sharing

2. **Visibility Settings**:
   - Friends only
   - Friends of friends
   - Hub members (same accommodation)
   - Public (all Adoreu users)

3. **Time-based Sharing**:
   - Share for next X hours
   - Share while at destination
   - Always share / Never share

#### Data Protection
- Location data encrypted in transit and at rest
- Automatic location history deletion after 30 days
- User can delete location history anytime
- GDPR/CCPA compliant data handling

---

## Edge Cases & Error Handling

### Location Services
- **Permission Denied**: Show map without user location, prompt to enable
- **GPS Unavailable**: Fall back to IP-based location
- **Poor Accuracy**: Show accuracy radius, warn user

### Connectivity
- **Offline Mode**: Cache last known positions, queue actions
- **Slow Connection**: Progressive loading, show placeholders
- **WebSocket Disconnect**: Attempt reconnect with exponential backoff

### Data Conflicts
- **Stale Data**: Show last update time, offer manual refresh
- **Full Activity**: Disable join button, show waitlist option
- **Cancelled Activity**: Remove from map, show notification

### Performance Degradation
- **Too Many Markers**: Aggressive clustering, viewport culling
- **Memory Pressure**: Clear image cache, reduce marker detail
- **Battery Low**: Prompt to reduce update frequency

---

## Implementation Phases

### Phase 1: MVP (Week 1-2)
- Basic map with current location
- Friend markers (static positions)
- Activity pins (basic info)
- Simple list view
- Tap to view details

### Phase 2: Core Features (Week 3-4)
- Real-time friend updates
- Activity filtering
- Search functionality
- Join activity flow
- Create activity (basic)

### Phase 3: Enhanced UX (Week 5-6)
- Clustering implementation
- Smooth animations
- Offline support
- Push notifications
- Advanced filters

### Phase 4: Social Features (Week 7-8)
- Friend activity feed
- Activity recommendations
- Social proof indicators
- Chat integration
- Activity sharing

---

## Testing Strategy

### Functional Testing
- Location permission flows
- Filter combinations
- Real-time update latency
- Activity CRUD operations
- Edge case handling

### Performance Testing
- Load testing with 1000+ markers
- Memory leak detection
- Battery usage monitoring
- Network bandwidth optimization
- Stress testing with poor connectivity

### Usability Testing
- First-time user experience
- Activity discovery flow
- Friend finding scenarios
- A/B testing filter layouts
- Accessibility compliance

---

## Launch Criteria

### Must Have
- [x] Map displays current location
- [x] Friends shown on map (with permission)
- [x] Activities displayed with basic info
- [x] List view with filtering
- [x] Activity detail view
- [x] Join activity functionality
- [x] Real-time updates
- [x] Error handling for common cases

### Nice to Have
- [ ] Advanced ML recommendations
- [ ] Voice search
- [ ] AR mode for navigation
- [ ] Saved places
- [ ] Activity history
- [ ] Social sharing to external apps

---

## Metrics & Analytics

### Key Metrics to Track
1. **Usage Metrics**:
   - Daily/Weekly/Monthly active users on map
   - Average session duration
   - Number of map interactions per session
   - Filter usage patterns

2. **Discovery Metrics**:
   - Activities viewed per session
   - Click-through rate from map to detail
   - Search queries and success rate
   - Filter combination patterns

3. **Social Metrics**:
   - Friend meetups initiated
   - Activities joined
   - Activities created
   - Messages sent from map

4. **Performance Metrics**:
   - Map load time
   - Frame rate during interaction
   - Crash rate
   - API response times

### A/B Testing Opportunities
- List vs Grid view for activities
- Different clustering algorithms
- Filter placement and design
- Default zoom levels
- Activity card layouts

---

## Appendix

### Competitive Analysis
- **Meetup**: Group-focused, lacks real-time friend tracking
- **Facebook Events**: Social proof but not travel-specific
- **Spotted**: Real-time but lacks activity coordination
- **Google Maps**: Great UX but no social features

### Technical Dependencies
- react-native-maps: ^1.7.1
- @react-native-community/geolocation: ^3.0.6
- expo-location: ~16.5.0
- convex: ^1.0.0
- react-native-reanimated: ~3.5.0

### Design References
- Airbnb Experiences map view
- Uber's location picker
- Instagram's location tags
- Snapchat Map social layer

### Future Enhancements
1. **AI-Powered Recommendations**: ML model for activity suggestions
2. **AR Navigation**: Camera overlay for finding venues
3. **Group Coordination**: Multi-person meetup planning
4. **Local Guides**: Verified local user recommendations
5. **Event Integration**: Auto-import from calendar apps
6. **Weather Overlay**: Show conditions affecting activities
7. **Transportation**: Integrated ride-sharing options
8. **Safety Features**: Emergency contacts, safe zones
9. **Gamification**: Points for exploration, meetups
10. **Business Tools**: Analytics for activity hosts

---

## Revision History

### Version 1.0 - Initial Release
- Date: 2024-01-14
- Author: Adoreu Product Team
- Status: Draft for Review

### Next Review
- Scheduled: After Phase 1 implementation
- Focus: User feedback integration and Phase 2 planning

---

## Sign-off

**Product Owner**: ___________________ Date: ___________

**Engineering Lead**: ___________________ Date: ___________

**Design Lead**: ___________________ Date: ___________

**QA Lead**: ___________________ Date: ___________