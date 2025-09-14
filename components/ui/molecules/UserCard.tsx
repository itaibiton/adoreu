import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';
import Card from './Card';
import Avatar, { TravelStatus } from '../atoms/Avatar';
import Badge from '../atoms/Badge';
import DistanceIndicator from '../travel/DistanceIndicator';
import TravelStatusComponent from '../travel/TravelStatus';

export interface UserCardData {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  travelStatus: TravelStatus;
  location?: string;
  distance?: number;
  mutualFriends?: number;
  interests?: string[];
  isOnline?: boolean;
  lastSeen?: string;
}

interface UserCardProps {
  user: UserCardData;
  variant?: 'default' | 'compact' | 'detailed';
  onPress?: (user: UserCardData) => void;
  onMessagePress?: (user: UserCardData) => void;
  onFollowPress?: (user: UserCardData) => void;
  showActions?: boolean;
  showDistance?: boolean;
  showStatus?: boolean;
  className?: string;
}

export default function UserCard({
  user,
  variant = 'default',
  onPress,
  onMessagePress,
  onFollowPress,
  showActions = true,
  showDistance = true,
  showStatus = true,
  className,
}: UserCardProps) {
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  const cardClasses = cn(
    'flex-row items-center',
    !isCompact && 'p-4',
    isCompact && 'p-3',
    className
  );

  const renderCompactCard = () => (
    <TouchableOpacity
      onPress={() => onPress?.(user)}
      className="flex-row items-center p-3 active:bg-gray-50 dark:active:bg-gray-800"
    >
      <Avatar
        size="sm"
        src={user.avatar}
        fallback={user.name}
        travelStatus={user.travelStatus}
        showStatusIndicator={showStatus}
      />

      <View className="flex-1 ml-3">
        <Text className="font-semibold text-gray-900 dark:text-white">
          {user.name}
        </Text>
        {user.location && (
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {user.location}
          </Text>
        )}
      </View>

      {showDistance && user.distance !== undefined && (
        <DistanceIndicator
          distance={user.distance}
          size="sm"
          showIcon={false}
        />
      )}
    </TouchableOpacity>
  );

  const renderActions = () => {
    if (!showActions) return null;

    return (
      <View className="flex-row space-x-2 mt-3">
        {onMessagePress && (
          <TouchableOpacity
            onPress={() => onMessagePress(user)}
            className="flex-1 flex-row items-center justify-center px-3 py-2 bg-blue-600 rounded-lg active:bg-blue-700"
          >
            <Ionicons name="chatbubble" size={16} color="white" />
            <Text className="text-white font-medium ml-2">Message</Text>
          </TouchableOpacity>
        )}

        {onFollowPress && (
          <TouchableOpacity
            onPress={() => onFollowPress(user)}
            className="flex-1 flex-row items-center justify-center px-3 py-2 border border-blue-600 rounded-lg active:bg-blue-50 dark:active:bg-blue-950"
          >
            <Ionicons name="person-add" size={16} color="#2563EB" />
            <Text className="text-blue-600 font-medium ml-2">Follow</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (isCompact) {
    return renderCompactCard();
  }

  return (
    <Card
      variant="travel"
      pressable
      onPress={() => onPress?.(user)}
      className={cardClasses}
    >
      <Avatar
        size={isDetailed ? 'lg' : 'md'}
        src={user.avatar}
        fallback={user.name}
        travelStatus={user.travelStatus}
        showStatusIndicator={showStatus}
      />

      <View className="flex-1 ml-4">
        {/* Header with name and status */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-lg font-bold text-gray-900 dark:text-white">
            {user.name}
          </Text>
          {user.isOnline && (
            <View className="w-2 h-2 bg-green-500 rounded-full" />
          )}
        </View>

        {/* Travel status */}
        {showStatus && (
          <View className="mb-2">
            <TravelStatusComponent
              status={user.travelStatus}
              location={user.location}
              size="sm"
              variant="minimal"
            />
          </View>
        )}

        {/* Bio */}
        {user.bio && isDetailed && (
          <Text className="text-gray-600 dark:text-gray-400 mb-3">
            {user.bio}
          </Text>
        )}

        {/* Distance and mutual friends */}
        <View className="flex-row items-center flex-wrap gap-2 mb-2">
          {showDistance && user.distance !== undefined && (
            <DistanceIndicator
              distance={user.distance}
              size="sm"
            />
          )}

          {user.mutualFriends && user.mutualFriends > 0 && (
            <Badge
              variant="neutral"
              size="sm"
              icon="people"
            >
              {user.mutualFriends} mutual
            </Badge>
          )}
        </View>

        {/* Interests */}
        {user.interests && user.interests.length > 0 && isDetailed && (
          <View className="flex-row flex-wrap gap-1 mb-3">
            {user.interests.slice(0, 3).map((interest, index) => (
              <Badge
                key={index}
                variant="travel"
                size="sm"
              >
                {interest}
              </Badge>
            ))}
            {user.interests.length > 3 && (
              <Badge
                variant="neutral"
                size="sm"
              >
                +{user.interests.length - 3}
              </Badge>
            )}
          </View>
        )}

        {/* Last seen */}
        {!user.isOnline && user.lastSeen && isDetailed && (
          <Text className="text-xs text-gray-500 dark:text-gray-500">
            Last seen {user.lastSeen}
          </Text>
        )}

        {/* Actions */}
        {renderActions()}
      </View>
    </Card>
  );
}

// Preset variants
export function CompactUserCard(props: Omit<UserCardProps, 'variant'>) {
  return <UserCard {...props} variant="compact" />;
}

export function DetailedUserCard(props: Omit<UserCardProps, 'variant'>) {
  return <UserCard {...props} variant="detailed" />;
}

// List component for multiple users
interface UserListProps {
  users: UserCardData[];
  variant?: UserCardProps['variant'];
  onUserPress?: (user: UserCardData) => void;
  onMessagePress?: (user: UserCardData) => void;
  onFollowPress?: (user: UserCardData) => void;
  showActions?: boolean;
  showDistance?: boolean;
  className?: string;
  emptyMessage?: string;
}

export function UserList({
  users,
  variant = 'default',
  onUserPress,
  onMessagePress,
  onFollowPress,
  showActions = true,
  showDistance = true,
  className,
  emptyMessage = 'No users found',
}: UserListProps) {
  if (users.length === 0) {
    return (
      <View className={cn('items-center justify-center p-8', className)}>
        <Ionicons name="people-outline" size={48} color="#9CA3AF" />
        <Text className="text-gray-500 dark:text-gray-400 text-center mt-4">
          {emptyMessage}
        </Text>
      </View>
    );
  }

  return (
    <View className={className}>
      {users.map((user, index) => (
        <View key={user.id}>
          <UserCard
            user={user}
            variant={variant}
            onPress={onUserPress}
            onMessagePress={onMessagePress}
            onFollowPress={onFollowPress}
            showActions={showActions}
            showDistance={showDistance}
          />
          {index < users.length - 1 && variant !== 'compact' && (
            <View className="h-px bg-gray-200 dark:bg-gray-700 mx-4" />
          )}
        </View>
      ))}
    </View>
  );
}