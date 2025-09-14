import React from 'react';
import { View, Text, Image } from 'react-native';

export interface FriendMarkerData {
  id: string;
  name: string;
  avatar?: string;
  latitude: number;
  longitude: number;
  status: 'available' | 'busy' | 'offline';
  currentActivity?: string;
  lastSeen?: string;
}

interface FriendMarkerProps {
  friend: FriendMarkerData;
  onPress?: (friend: FriendMarkerData) => void;
  isSelected?: boolean;
}

export default function FriendMarker({ friend, onPress, isSelected }: FriendMarkerProps) {
  const statusColors = {
    available: '#10B981',
    busy: '#F97316',
    offline: '#9CA3AF',
  };

  // Render custom marker view
  return (
    <View style={{ alignItems: 'center' }}>
      {/* Marker container */}
      <View style={{ position: 'relative' }}>
        {/* Avatar container with shadow */}
        <View style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: 'white',
          padding: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderWidth: isSelected ? 2 : 0,
          borderColor: isSelected ? '#3B82F6' : 'transparent'
        }}>
          {friend.avatar ? (
            <Image
              source={{ uri: friend.avatar }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 22
              }}
              resizeMode="cover"
            />
          ) : (
            <View style={{
              width: '100%',
              height: '100%',
              borderRadius: 22,
              backgroundColor: '#D1D5DB',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 18
              }}>
                {friend.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          {/* Status indicator */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 12,
              height: 12,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: 'white',
              backgroundColor: statusColors[friend.status]
            }}
          />
        </View>
      </View>

      {/* Name label */}
      {isSelected && (
        <View style={{
          marginTop: 4,
          paddingHorizontal: 8,
          paddingVertical: 2,
          backgroundColor: 'white',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3
        }}>
          <Text style={{
            fontSize: 11,
            fontWeight: '500',
            color: '#111827'
          }}>
            {friend.name.split(' ')[0]}
          </Text>
        </View>
      )}
    </View>
  );
}