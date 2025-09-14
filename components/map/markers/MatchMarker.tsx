import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface MatchMarkerData {
  id: string;
  latitude: number;
  longitude: number;
  type: 'solo' | 'group';
  matchName: string;
  compatibility: number; // 0-100
  sharedInterests: string[];
  distance?: number;
}

interface MatchMarkerProps {
  match: MatchMarkerData;
  onPress?: (match: MatchMarkerData) => void;
  isSelected?: boolean;
}

export default function MatchMarker({ match, onPress, isSelected }: MatchMarkerProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulsing animation for attention
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return '#10B981'; // green
    if (score >= 60) return '#F97316'; // orange
    return '#6B7280'; // gray
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Pulsing ring */}
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ scale: pulseAnim }],
          opacity: pulseAnim.interpolate({
            inputRange: [1, 1.2],
            outputRange: [0.6, 0],
          }),
        }}
      >
        <View style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: '#60A5FA'
        }} />
      </Animated.View>

      {/* Main marker */}
      <View style={{ position: 'relative' }}>
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#3B82F6',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderWidth: isSelected ? 2 : 0,
          borderColor: isSelected ? 'white' : 'transparent'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 8
          }}>
            <Ionicons
              name={match.type === 'solo' ? 'person' : 'people'}
              size={20}
              color="#3B82F6"
            />
          </View>

          {/* Compatibility badge */}
          <View
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              borderRadius: 14,
              paddingHorizontal: 6,
              paddingVertical: 2,
              minWidth: 28,
              alignItems: 'center',
              backgroundColor: getCompatibilityColor(match.compatibility)
            }}
          >
            <Text style={{
              fontSize: 11,
              fontWeight: 'bold',
              color: 'white'
            }}>
              {match.compatibility}%
            </Text>
          </View>
        </View>
      </View>

      {/* Match info (shown when selected) */}
      {isSelected && (
        <View style={{
          marginTop: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: 'white',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3
        }}>
          <Text style={{
            fontSize: 11,
            fontWeight: 'bold',
            color: '#111827',
            textAlign: 'center'
          }}>
            Match Opportunity!
          </Text>
          <Text style={{
            fontSize: 10,
            color: '#6B7280',
            textAlign: 'center'
          }}>
            {match.matchName}
          </Text>
          {match.sharedInterests.length > 0 && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 4
            }}>
              <View style={{
                backgroundColor: '#DBEAFE',
                borderRadius: 10,
                paddingHorizontal: 8,
                paddingVertical: 2
              }}>
                <Text style={{
                  fontSize: 10,
                  color: '#2563EB'
                }}>
                  {match.sharedInterests[0]}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}