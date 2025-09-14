import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface ActivityMarkerData {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  category: 'adventure' | 'culture' | 'food' | 'nightlife' | 'nature' | 'relaxation';
  participantCount: number;
  maxParticipants?: number;
  startTime: string;
  status: 'upcoming' | 'ongoing' | 'ending_soon';
  price?: number;
}

interface ActivityMarkerProps {
  activity: ActivityMarkerData;
  onPress?: (activity: ActivityMarkerData) => void;
  isSelected?: boolean;
}

const categoryConfig = {
  adventure: {
    color: '#10B981',
    icon: 'compass' as keyof typeof Ionicons.glyphMap,
  },
  culture: {
    color: '#8B5CF6',
    icon: 'library' as keyof typeof Ionicons.glyphMap,
  },
  food: {
    color: '#F97316',
    icon: 'restaurant' as keyof typeof Ionicons.glyphMap,
  },
  nightlife: {
    color: '#EC4899',
    icon: 'moon' as keyof typeof Ionicons.glyphMap,
  },
  nature: {
    color: '#059669',
    icon: 'leaf' as keyof typeof Ionicons.glyphMap,
  },
  relaxation: {
    color: '#06B6D4',
    icon: 'water' as keyof typeof Ionicons.glyphMap,
  },
};

export default function ActivityMarker({ activity, onPress, isSelected }: ActivityMarkerProps) {
  const config = categoryConfig[activity.category];
  const isFull = activity.maxParticipants && activity.participantCount >= activity.maxParticipants;

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Pin container */}
      <View style={{ position: 'relative' }}>
        {/* Main pin body */}
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: config.color,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderWidth: isSelected ? 2 : 0,
          borderColor: isSelected ? 'white' : 'transparent',
          opacity: isFull ? 0.75 : 1
        }}>
          <Ionicons
            name={config.icon}
            size={24}
            color="white"
          />

          {/* Participant count badge */}
          <View style={{
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
            minWidth: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 11,
              fontWeight: 'bold',
              color: '#111827'
            }}>
              {activity.participantCount}
            </Text>
          </View>

          {/* Status indicator */}
          {activity.status === 'ongoing' && (
            <View style={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              width: 12,
              height: 12,
              backgroundColor: '#34D399',
              borderRadius: 6
            }} />
          )}
        </View>
      </View>

      {/* Title label (shown when selected) */}
      {isSelected && (
        <View style={{
          marginTop: 8,
          paddingHorizontal: 8,
          paddingVertical: 4,
          backgroundColor: 'white',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          maxWidth: 100
        }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '600',
              color: '#111827',
              textAlign: 'center'
            }}
            numberOfLines={2}
          >
            {activity.title}
          </Text>
          {activity.status === 'ending_soon' && (
            <Text style={{
              fontSize: 10,
              color: '#F97316',
              textAlign: 'center'
            }}>
              Ending soon
            </Text>
          )}
        </View>
      )}
    </View>
  );
}