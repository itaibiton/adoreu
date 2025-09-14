import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import our design system components
import Button from '../../components/ui/atoms/Button';
import Badge from '../../components/ui/atoms/Badge';
import Avatar from '../../components/ui/atoms/Avatar';
import Input from '../../components/ui/atoms/Input';
import Chip from '../../components/ui/atoms/Chip';
import Card, { CardHeader, CardContent, CardFooter } from '../../components/ui/molecules/Card';
import SearchBar, { SearchSuggestion } from '../../components/ui/molecules/SearchBar';
import UserCard, { UserCardData } from '../../components/ui/molecules/UserCard';
import ActivityCard, { ActivityCardData } from '../../components/ui/molecules/ActivityCard';
import LocationCard, { LocationCardData } from '../../components/ui/molecules/LocationCard';
import DistanceIndicator from '../../components/ui/travel/DistanceIndicator';
import TravelStatus from '../../components/ui/travel/TravelStatus';

// Import design tokens
import { colors, typography, spacing } from '../../utils/design-tokens';

export default function DesignSystemPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>(['travel']);
  const [showColorDetails, setShowColorDetails] = useState(false);

  // Mock data
  const searchSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Paris, France', subtitle: 'Popular destination', type: 'location' },
    { id: '2', title: 'Food Tours', subtitle: '12 activities available', type: 'activity' },
    { id: '3', title: 'John Traveler', subtitle: 'In your area', type: 'user' },
  ];

  const mockUser: UserCardData = {
    id: '1',
    name: 'Sarah Explorer',
    avatar: '',
    bio: 'Adventure seeker and culture enthusiast. Always up for discovering hidden gems!',
    travelStatus: 'traveling',
    location: 'Bali, Indonesia',
    distance: 2.3,
    mutualFriends: 5,
    interests: ['Adventure', 'Food', 'Culture', 'Photography'],
    isOnline: true,
  };

  const mockActivity: ActivityCardData = {
    id: '1',
    title: 'Food Tour of Tokyo',
    description: 'Discover hidden culinary gems in Tokyo\'s backstreets with a local guide.',
    category: 'food',
    price: { amount: 75, currency: '$' },
    duration: '3 hours',
    location: 'Shibuya, Tokyo',
    distance: 1.2,
    rating: 4.8,
    participantCount: 8,
    maxParticipants: 12,
    date: 'Tomorrow',
    time: '6:00 PM',
    organizer: {
      id: '2',
      name: 'Yuki Tanaka',
      avatar: '',
    },
    tags: ['Local Experience', 'Street Food', 'Culture'],
  };

  const mockLocation: LocationCardData = {
    id: '1',
    name: 'Senso-ji Temple',
    description: 'Tokyo\'s oldest Buddhist temple with stunning traditional architecture.',
    type: 'landmark',
    country: 'Japan',
    region: 'Asakusa, Tokyo',
    distance: 0.8,
    rating: 4.6,
    reviewCount: 1250,
    tags: ['Historic', 'Buddhist', 'Photography', 'Free Entry'],
    highlights: [
      'Founded in 645 AD',
      'Beautiful traditional architecture',
      'Famous Nakamise shopping street'
    ],
    travelersCount: 150,
    favoriteCount: 89,
    isBookmarked: true,
  };

  const toggleChip = (chip: string) => {
    setSelectedChips(prev =>
      prev.includes(chip)
        ? prev.filter(c => c !== chip)
        : [...prev, chip]
    );
  };

  const ColorSwatch = ({ name, color, description }: { name: string; color: string; description: string }) => (
    <View className="items-center mb-4">
      <View
        className="w-16 h-16 rounded-lg border border-gray-200 dark:border-gray-700 mb-2 shadow-sm"
        style={{ backgroundColor: color }}
      />
      <Text className="text-sm font-semibold text-gray-900 dark:text-white">{name}</Text>
      <Text className="text-xs text-gray-600 dark:text-gray-400 text-center">{description}</Text>
      {showColorDetails && (
        <Text className="text-xs text-gray-500 dark:text-gray-500 font-mono mt-1">{color}</Text>
      )}
    </View>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mb-8">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</Text>
      {children}
    </View>
  );

  const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{title}</Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">Design System</Text>
        <TouchableOpacity
          onPress={() => setShowColorDetails(!showColorDetails)}
          className="flex-row items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full"
        >
          <Ionicons name="color-palette" size={16} color="#2563EB" />
          <Text className="text-blue-600 dark:text-blue-400 text-sm font-medium ml-1">
            {showColorDetails ? 'Hide' : 'Show'} Codes
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Color Palette */}
        <Section title="Color Palette">
          <Text className="text-gray-600 dark:text-gray-400 mb-6">
            Travel-inspired colors designed to evoke adventure, discovery, and connection.
          </Text>

          <SubSection title="Primary Colors">
            <View className="flex-row justify-around mb-6">
              <ColorSwatch name="Ocean Blue" color="#1E88E5" description="Primary actions" />
              <ColorSwatch name="Deep Blue" color="#1565C0" description="Primary dark" />
              <ColorSwatch name="Sunset Orange" color="#F97316" description="Secondary" />
              <ColorSwatch name="Adventure Green" color="#10B981" description="Success/Available" />
            </View>
          </SubSection>

          <SubSection title="Travel Theme">
            <View className="flex-row justify-around">
              <ColorSwatch name="Sky" color="#87CEEB" description="Peaceful" />
              <ColorSwatch name="Ocean Deep" color="#006994" description="Deep waters" />
              <ColorSwatch name="Mountain" color="#8B7D6B" description="Adventure" />
            </View>
          </SubSection>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <View className="space-y-2">
            <Text className="text-4xl font-bold text-gray-900 dark:text-white">Heading 1</Text>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">Heading 2</Text>
            <Text className="text-2xl font-semibold text-gray-900 dark:text-white">Heading 3</Text>
            <Text className="text-xl font-semibold text-gray-900 dark:text-white">Heading 4</Text>
            <Text className="text-lg font-medium text-gray-900 dark:text-white">Heading 5</Text>
            <Text className="text-base text-gray-900 dark:text-white">Body text - Lorem ipsum dolor sit amet consectetur.</Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">Small text - Supporting information and captions.</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-500">Extra small - Timestamps and metadata.</Text>
          </View>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <SubSection title="Variants">
            <View className="space-y-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="travel" leftIcon="airplane">Travel Button</Button>
            </View>
          </SubSection>

          <SubSection title="Sizes">
            <View className="space-y-3">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
              <Button size="xl">Extra Large</Button>
            </View>
          </SubSection>

          <SubSection title="States">
            <View className="space-y-3">
              <Button loading>Loading Button</Button>
              <Button disabled>Disabled Button</Button>
              <Button leftIcon="heart" rightIcon="arrow-forward">With Icons</Button>
            </View>
          </SubSection>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <SubSection title="Variants">
            <View className="flex-row flex-wrap gap-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="travel" icon="airplane">Travel</Badge>
            </View>
          </SubSection>

          <SubSection title="With Indicators">
            <View className="flex-row flex-wrap gap-2">
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="primary" icon="notifications">3 notifications</Badge>
              <Badge variant="warning" icon="time">Pending</Badge>
            </View>
          </SubSection>
        </Section>

        {/* Avatars */}
        <Section title="Avatars">
          <SubSection title="Sizes">
            <View className="flex-row items-center space-x-4">
              <Avatar size="xs" fallback="XS" />
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" />
              <Avatar size="lg" fallback="LG" />
              <Avatar size="xl" fallback="XL" />
              <Avatar size="2xl" fallback="2XL" />
            </View>
          </SubSection>

          <SubSection title="With Travel Status">
            <View className="flex-row items-center space-x-4">
              <Avatar size="lg" fallback="SA" travelStatus="traveling" showStatusIndicator />
              <Avatar size="lg" fallback="JD" travelStatus="available" showStatusIndicator />
              <Avatar size="lg" fallback="MK" travelStatus="busy" showStatusIndicator />
              <Avatar size="lg" fallback="RL" travelStatus="offline" showStatusIndicator />
            </View>
          </SubSection>
        </Section>

        {/* Input Fields */}
        <Section title="Input Fields">
          <SubSection title="Variants">
            <View className="space-y-4">
              <Input
                label="Default Input"
                placeholder="Enter your destination"
                leftIcon="location"
              />
              <Input
                variant="filled"
                label="Filled Input"
                placeholder="Search activities"
                leftIcon="search"
              />
              <Input
                variant="travel"
                label="Travel Input"
                placeholder="Where are you going?"
                leftIcon="airplane"
                rightIcon="arrow-forward"
              />
            </View>
          </SubSection>

          <SubSection title="States">
            <View className="space-y-4">
              <Input
                label="With Error"
                placeholder="Required field"
                error="This field is required"
                leftIcon="alert-circle"
              />
              <Input
                label="With Hint"
                placeholder="Optional field"
                hint="This information helps us personalize your experience"
                leftIcon="information-circle"
              />
            </View>
          </SubSection>
        </Section>

        {/* Chips */}
        <Section title="Chips">
          <SubSection title="Selection">
            <View className="flex-row flex-wrap gap-2">
              {['adventure', 'culture', 'food', 'nature', 'nightlife', 'travel'].map((chip) => (
                <Chip
                  key={chip}
                  variant={selectedChips.includes(chip) ? 'primary' : 'default'}
                  selected={selectedChips.includes(chip)}
                  onPress={() => toggleChip(chip)}
                  leftIcon={chip === 'travel' ? 'airplane' : undefined}
                >
                  {chip.charAt(0).toUpperCase() + chip.slice(1)}
                </Chip>
              ))}
            </View>
          </SubSection>

          <SubSection title="With Delete">
            <View className="flex-row flex-wrap gap-2">
              <Chip variant="success" deletable onDelete={() => {}}>Paris</Chip>
              <Chip variant="warning" deletable onDelete={() => {}}>Food Tours</Chip>
              <Chip variant="travel" deletable onDelete={() => {}}>Adventure</Chip>
            </View>
          </SubSection>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <SubSection title="Variants">
            <View className="space-y-4">
              <Card variant="default">
                <Text className="text-gray-900 dark:text-white">Default Card</Text>
              </Card>

              <Card variant="elevated" shadow>
                <Text className="text-gray-900 dark:text-white">Elevated Card with Shadow</Text>
              </Card>

              <Card variant="travel" shadow>
                <CardHeader>
                  <Text className="text-lg font-semibold text-gray-900 dark:text-white">Travel Card</Text>
                </CardHeader>
                <CardContent>
                  <Text className="text-gray-600 dark:text-gray-400">
                    Perfect for travel-related content with beautiful gradients and shadows.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Badge variant="travel" icon="airplane">Featured</Badge>
                </CardFooter>
              </Card>
            </View>
          </SubSection>

          <SubSection title="Pressable Cards">
            <Card variant="glass" pressable onPress={() => {}} shadow>
              <Text className="text-gray-900 dark:text-white font-medium">Pressable Glass Card</Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Tap me to see the interaction effect
              </Text>
            </Card>
          </SubSection>
        </Section>

        {/* Search Bar */}
        <Section title="Search Bar">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            suggestions={searchSuggestions}
            onSuggestionPress={(suggestion) => {
              setSearchQuery(suggestion.title);
            }}
            placeholder="Search destinations, activities, people..."
          />
        </Section>

        {/* Travel Components */}
        <Section title="Travel Components">
          <SubSection title="Distance Indicators">
            <View className="space-y-3">
              <DistanceIndicator distance={0.3} />
              <DistanceIndicator distance={2.5} showRange />
              <DistanceIndicator distance={15.7} format="miles" />
            </View>
          </SubSection>

          <SubSection title="Travel Status">
            <View className="space-y-3">
              <TravelStatus status="traveling" location="Tokyo" />
              <TravelStatus status="available" variant="pill" />
              <TravelStatus status="busy" variant="minimal" />
              <TravelStatus status="offline" size="sm" />
            </View>
          </SubSection>
        </Section>

        {/* Travel Cards */}
        <Section title="Travel Cards">
          <SubSection title="User Card">
            <UserCard
              user={mockUser}
              variant="detailed"
              onPress={() => {}}
              onMessagePress={() => {}}
              onFollowPress={() => {}}
            />
          </SubSection>

          <SubSection title="Activity Card">
            <ActivityCard
              activity={mockActivity}
              onPress={() => {}}
              onJoinPress={() => {}}
              onOrganizerPress={() => {}}
            />
          </SubSection>

          <SubSection title="Location Card">
            <LocationCard
              location={mockLocation}
              onPress={() => {}}
              onBookmarkPress={() => {}}
              onNavigatePress={() => {}}
              showWeather
            />
          </SubSection>
        </Section>

        {/* Spacing Guide */}
        <Section title="Spacing Scale">
          <Text className="text-gray-600 dark:text-gray-400 mb-4">
            Consistent spacing creates visual rhythm and hierarchy.
          </Text>
          <View className="space-y-2">
            {[1, 2, 3, 4, 6, 8, 12, 16, 20].map((space) => (
              <View key={space} className="flex-row items-center">
                <View className={`bg-blue-500 h-4`} style={{ width: space * 4 }} />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                  {space} = {space * 4}px
                </Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Dark Mode Toggle Note */}
        <Section title="Dark Mode Support">
          <Card variant="outlined">
            <View className="flex-row items-center">
              <Ionicons name="moon" size={24} color="#6B7280" />
              <Text className="flex-1 text-gray-600 dark:text-gray-400 ml-3">
                All components support dark mode automatically using Tailwind's dark: prefix.
              </Text>
            </View>
          </Card>
        </Section>

        {/* Usage Guidelines */}
        <Section title="Usage Guidelines">
          <Card variant="travel">
            <CardHeader>
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                Design Principles
              </Text>
            </CardHeader>
            <CardContent>
              <View className="space-y-2">
                <Text className="text-gray-700 dark:text-gray-300">
                  • <Text className="font-semibold">Travel-First:</Text> Every component is designed with travel experiences in mind
                </Text>
                <Text className="text-gray-700 dark:text-gray-300">
                  • <Text className="font-semibold">Accessible:</Text> All components include proper accessibility labels and states
                </Text>
                <Text className="text-gray-700 dark:text-gray-300">
                  • <Text className="font-semibold">Consistent:</Text> Unified spacing, colors, and typography across all components
                </Text>
                <Text className="text-gray-700 dark:text-gray-300">
                  • <Text className="font-semibold">Flexible:</Text> Multiple variants and sizes for different use cases
                </Text>
              </View>
            </CardContent>
          </Card>
        </Section>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}