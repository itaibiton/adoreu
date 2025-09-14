# Adoreu Design System

A comprehensive, travel-themed design system built for React Native with NativeWind/TailwindCSS.

## Overview

The Adoreu Design System provides a complete set of UI components specifically designed for travel applications. It features:

- 🌊 **Travel-inspired color palette** with ocean blues, sunset oranges, and adventure greens
- 🎨 **Consistent theming** with dark mode support throughout
- 📱 **Mobile-first design** optimized for React Native
- ♿ **Accessibility built-in** with proper labels and states
- 🧩 **Modular architecture** with atoms, molecules, and travel-specific components

## Quick Start

```typescript
import { Button, Card, Avatar, SearchBar } from '../../components/ui';

// Use components in your app
<Button variant="travel" leftIcon="airplane">
  Book Trip
</Button>
```

## Architecture

### Atoms (Basic Building Blocks)
- **Button**: Primary, secondary, outline, ghost, and travel variants
- **Badge**: Status indicators with travel-specific styles
- **Avatar**: User avatars with travel status indicators
- **Input**: Form inputs with travel icon support
- **Chip**: Tags and filters for travel categories

### Molecules (Component Combinations)
- **Card**: Flexible containers with travel-themed styling
- **SearchBar**: Smart search with location/activity suggestions
- **UserCard**: Display traveler information and status
- **ActivityCard**: Showcase travel activities and events
- **LocationCard**: Present destinations and places

### Travel-Specific Components
- **DistanceIndicator**: Visual distance representations
- **TravelStatus**: User travel state indicators

## Design Tokens

### Color Palette
```typescript
// Primary Ocean Blues
primary: {
  500: '#1E88E5', // Main primary
  600: '#1565C0', // Dark primary
}

// Secondary Sunset Oranges
secondary: {
  500: '#F97316', // Main secondary
  600: '#EA580C', // Dark secondary
}

// Accent Adventure Greens
accent: {
  500: '#10B981', // Main accent
  600: '#059669', // Dark accent
}
```

### Typography Scale
- **Headings**: 4xl (36px) → xl (20px)
- **Body**: base (16px)
- **Small**: sm (14px), xs (12px)
- **Weights**: light (300) → extrabold (800)

### Spacing Scale
Based on 4px grid system: `1` = 4px, `2` = 8px, `4` = 16px, etc.

## Component Usage

### Buttons
```typescript
// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="travel" leftIcon="airplane">Travel Button</Button>
<Button variant="outline" size="lg">Large Outline</Button>

// With loading state
<Button loading>Processing...</Button>

// With icons
<Button leftIcon="heart" rightIcon="arrow-forward">
  Save & Continue
</Button>
```

### Cards
```typescript
// Basic card
<Card variant="travel" shadow>
  <CardHeader>
    <Text>Travel Destination</Text>
  </CardHeader>
  <CardContent>
    <Text>Beautiful place to visit...</Text>
  </CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>

// Pressable card
<Card pressable onPress={() => navigate('/details')}>
  Content here
</Card>
```

### Travel Components
```typescript
// Distance indicators
<DistanceIndicator distance={2.3} />
<DistanceIndicator distance={15.7} format="miles" showRange />

// Travel status
<TravelStatus status="traveling" location="Tokyo" />
<TravelStatus status="available" variant="pill" />
```

### Search Bar
```typescript
<SearchBar
  placeholder="Search destinations..."
  suggestions={[
    { id: '1', title: 'Paris', type: 'location' },
    { id: '2', title: 'Food Tours', type: 'activity' },
  ]}
  onSuggestionPress={(suggestion) => {
    // Handle selection
  }}
/>
```

## Theme Support

All components automatically support light and dark modes using Tailwind's `dark:` prefix:

```typescript
// This automatically adapts to system theme
<Card className="bg-white dark:bg-gray-800">
  <Text className="text-gray-900 dark:text-white">
    Content adapts to theme
  </Text>
</Card>
```

## Accessibility

Components include built-in accessibility features:
- Semantic roles and labels
- Screen reader support
- Keyboard navigation
- High contrast support
- Focus management

## Travel-Themed Features

### Status Indicators
- **Traveling**: Green with airplane icon
- **Available**: Blue with checkmark
- **Busy**: Orange with clock
- **Offline**: Gray with remove circle

### Activity Categories
- **Adventure**: Mountain green (#10B981)
- **Culture**: Purple (#8B5CF6)
- **Food**: Orange (#F97316)
- **Nightlife**: Pink (#EC4899)
- **Nature**: Green (#059669)
- **Relaxation**: Cyan (#06B6D4)

### Distance Ranges
- **Near** (< 1km): Green
- **Medium** (1-5km): Orange
- **Far** (> 5km): Blue

## Design System Showcase

Visit the "Design" tab in the app to see all components in action with:
- Live color palette
- Interactive component examples
- Typography samples
- Spacing guidelines
- Usage patterns

## Best Practices

### Do's
✅ Use semantic HTML/React Native elements
✅ Follow the established color palette
✅ Maintain consistent spacing (4px grid)
✅ Test in both light and dark modes
✅ Include proper accessibility labels
✅ Use travel-themed variants when appropriate

### Don'ts
❌ Mix different design systems
❌ Use arbitrary colors outside the palette
❌ Ignore dark mode compatibility
❌ Skip accessibility considerations
❌ Break the spacing grid
❌ Override component internals

## Contributing

When adding new components:
1. Follow the atomic design methodology
2. Include TypeScript interfaces
3. Add accessibility support
4. Support dark mode
5. Include usage examples
6. Add to the design system showcase

## File Structure

```
components/ui/
├── atoms/              # Basic building blocks
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Input.tsx
│   └── Chip.tsx
├── molecules/          # Component combinations
│   ├── Card.tsx
│   ├── SearchBar.tsx
│   ├── UserCard.tsx
│   ├── ActivityCard.tsx
│   └── LocationCard.tsx
├── travel/             # Travel-specific components
│   ├── DistanceIndicator.tsx
│   └── TravelStatus.tsx
├── index.ts            # Main exports
└── README.md           # This file

utils/
├── design-tokens.ts    # Color palette and design tokens
└── cn.ts              # Utility for className concatenation
```

## Dependencies

- React Native
- NativeWind (TailwindCSS for React Native)
- @expo/vector-icons (for icons)
- TypeScript (for type safety)

The design system is fully compatible with Expo SDK 53+ and follows React Native best practices for performance and accessibility.