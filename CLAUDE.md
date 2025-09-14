# 🌍 Adoreu Development Guidelines

## Project Overview

**Adoreu** is a social travel app that connects travelers, enabling them to:
- Discover which friends are traveling to the same destinations
- Meet new travelers with similar interests
- Find and join group activities
- Share real-time presence on an interactive map
- Create travel-focused social connections

## Tech Stack

### Core Technologies
- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript (strict mode enabled)
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Authentication**: Clerk
- **Backend**: Convex (real-time database)
- **Maps**: React Native Maps with Google Maps API
- **State Management**: Convex reactive queries + React Context

## Code Standards

### TypeScript Guidelines
```typescript
// ✅ ALWAYS use strict typing
interface UserProps {
  userId: string;
  displayName: string;
  avatarUrl?: string; // Optional fields explicitly marked
}

// ✅ Use type literals for known values
type Visibility = "friends" | "fof" | "hub" | "private";

// ❌ Avoid 'any' type
// ✅ Use 'unknown' when type is truly unknown and add type guards
```

### Component Patterns

```typescript
// ✅ Functional components with explicit return types
export default function ComponentName() {
  // Hooks at the top
  const { user } = useAuth();
  const data = useQuery(api.endpoint);
  
  // Early returns for loading/error states
  if (!data) return <LoadingView />;
  
  // Main render
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Content */}
    </SafeAreaView>
  );
}
```

### Styling with NativeWind
```tsx
// ✅ Use className for all styling
<View className="flex-1 p-4 bg-white dark:bg-gray-800">
  <Text className="text-lg font-semibold text-gray-900 dark:text-white">
    Title
  </Text>
</View>

// ✅ Dark mode support with dark: prefix
// ✅ Consistent spacing: p-2, p-4, p-6
// ✅ Consistent border radius: rounded-lg, rounded-full
```

### File Organization
```
app/
  (auth)/          # Auth screens (sign-in, sign-up, onboarding)
  (tabs)/          # Main app tabs (map, hub, groups, inbox, profile)
  _layout.tsx      # Root layout with providers
  index.tsx        # Entry point

components/
  common/          # Reusable UI components
  features/        # Feature-specific components
  
convex/
  schema.ts        # Database schema
  auth.ts          # Auth functions
  [feature].ts     # Feature-specific functions
  
providers/
  ClerkProvider.tsx
  [Feature]Provider.tsx
  
hooks/
  use[Feature].ts  # Custom hooks
  
utils/
  constants.ts
  helpers.ts
  types.ts
```

## Convex Patterns

### Schema Design
```typescript
// Tables follow consistent patterns:
defineTable({
  // IDs reference other tables
  userId: v.id("users"),
  
  // Timestamps as numbers (Unix ms)
  createdAt: v.number(),
  updatedAt: v.number(),
  
  // Enums use v.union(v.literal())
  status: v.union(
    v.literal("active"),
    v.literal("inactive")
  ),
  
  // Optional fields explicitly marked
  description: v.optional(v.string()),
})
.index("by_user", ["userId"]) // Consistent index naming
```

### Query/Mutation Patterns
```typescript
// ✅ Queries for reading data
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// ✅ Mutations for writing data
export const updateUser = mutation({
  args: { 
    userId: v.id("users"),
    data: v.object({...}) 
  },
  handler: async (ctx, args) => {
    // Validate permissions
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");
    
    // Perform update
    await ctx.db.patch(args.userId, {
      ...args.data,
      updatedAt: Date.now(),
    });
  },
});
```

## Authentication Flow

1. **ClerkProvider** wraps the app with auth context
2. **ConvexProviderWithClerk** syncs auth state with backend
3. **InitializeUser** creates/updates user on sign-in
4. **Tab Layout** checks auth and onboarding status
5. Protected routes redirect to sign-in if needed

## Navigation Structure

```
/ (index)
├── (auth)
│   ├── sign-in
│   ├── sign-up
│   ├── onboarding
│   └── user-info
└── (tabs)
    ├── map (default)
    ├── hub
    ├── groups
    ├── inbox
    └── profile
```

## Error Handling

```typescript
// ✅ Try-catch for async operations
try {
  await createUser(userData);
} catch (error) {
  console.error("Failed to create user:", error);
  // Show user-friendly error
}

// ✅ Early returns for invalid states
if (!user) {
  return <Text>Please sign in</Text>;
}

// ✅ Loading states
if (isLoading) {
  return <ActivityIndicator />;
}
```

## Performance Guidelines

1. **Image Optimization**
   - Use appropriate image sizes
   - Lazy load images in lists
   - Cache avatars and frequently used images

2. **List Rendering**
   - Use FlatList for long lists
   - Implement keyExtractor
   - Add getItemLayout when possible

3. **Convex Queries**
   - Use indexes for frequent queries
   - Paginate large result sets
   - Cache results with useQuery

## Security Best Practices

1. **Never expose sensitive data**
   - API keys in environment variables
   - Use EXPO_PUBLIC_ prefix for client-side env vars
   - Validate all user inputs

2. **Authentication checks**
   - Verify user identity in mutations
   - Check permissions for data access
   - Use row-level security in Convex

3. **Data validation**
   - Validate types with Convex schemas
   - Sanitize user-generated content
   - Prevent injection attacks

## Git Workflow

### Branch Naming
- `feature/[feature-name]`
- `fix/[bug-description]`
- `refactor/[component-name]`

### Commit Messages
```
feat: add group creation flow
fix: resolve map loading issue
refactor: optimize hub screen performance
docs: update API documentation
```

## Testing Strategy

### Before Committing
```bash
# Run linting
npm run lint

# Format code
npm run format

# Type checking (when available)
npx tsc --noEmit
```

## Development Commands

```bash
# Start development
npm start

# Run on iOS
npm run ios

# Run on Android  
npm run android

# Lint and format
npm run lint
npm run format

# Convex development
npx convex dev

# Deploy Convex
npx convex deploy
```

## Component Checklist

When creating new components:
- [ ] TypeScript interfaces for props
- [ ] Loading and error states handled
- [ ] Dark mode support with dark: classes
- [ ] Accessibility props (accessibilityLabel, etc.)
- [ ] Memoization for expensive operations
- [ ] Proper key props for lists
- [ ] SafeAreaView for top-level screens

## Feature Implementation Flow

1. **Plan** - Define requirements and user stories
2. **Schema** - Update Convex schema if needed
3. **Backend** - Write Convex functions
4. **UI** - Build React Native components
5. **Connect** - Wire up queries/mutations
6. **Test** - Manual testing on iOS/Android
7. **Polish** - Loading states, error handling, animations

## Common Patterns

### Loading States
```tsx
const [isLoading, setIsLoading] = useState(false);

// In component
if (isLoading) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#2563EB" />
    </View>
  );
}
```

### Form Handling
```tsx
const [formData, setFormData] = useState({
  title: "",
  description: "",
});

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await createGroup(formData);
    router.push("/groups");
  } catch (error) {
    Alert.alert("Error", "Failed to create group");
  } finally {
    setIsLoading(false);
  }
};
```

### List Components
```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => <ItemComponent {...item} />}
  ListEmptyComponent={<EmptyState />}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>
```

## Environment Variables

Required environment variables:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
EXPO_PUBLIC_CONVEX_URL=https://...convex.cloud
```

## Platform-Specific Code

```tsx
import { Platform } from "react-native";

const styles = {
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
};
```

## Quick Reference

### Frequently Used Imports
```typescript
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
```

### Color Palette
- Primary: `blue-600` (#2563EB)
- Secondary: `purple-600`
- Success: `green-600`
- Warning: `yellow-600`
- Error: `red-600`
- Gray scale: `gray-50` to `gray-900`

## Feature PRDs

### Map Feature
When working on the map feature, refer to `/features-prds/map.prd.md` for:
- User stories and personas
- Functional requirements for map and list components
- UI/UX specifications and interactions
- Data models (UserLocation, Activity, MapState)
- Performance requirements and optimization strategies
- Privacy and location sharing settings
- Implementation phases

## Notes for Claude

When working on adoreu:
1. Always check existing patterns before implementing new features
2. Maintain consistent styling with NativeWind classes
3. Ensure dark mode support for all new components
4. Add proper TypeScript types - no `any` types
5. Follow the established Convex schema patterns
6. Test on both iOS and Android simulators when possible
7. Keep performance in mind - optimize images and lists
8. Add loading and error states for all async operations
9. Use semantic git commits
10. Run lint before suggesting code completion
11. **For map feature**: Always reference `/features-prds/map.prd.md` for requirements and specifications

Remember: adoreu is about connecting travelers and creating meaningful travel experiences. Keep the UX friendly, intuitive, and travel-focused.