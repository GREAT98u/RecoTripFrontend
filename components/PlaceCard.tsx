import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MapPin, Star, Heart } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import {
  calculateTravelTime,
  suggestTransportMode,
} from '../utils/distance';

interface PlaceCardProps {
  name: string;
  rating: number;
  distance: number;
  onViewMap: () => void;
  onAddReview: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export function PlaceCard({
  name,
  rating,
  distance,
  onViewMap,
  onAddReview,
  onToggleFavorite,
  isFavorite,
}: PlaceCardProps) {
  const travelTime = calculateTravelTime(distance);
  const transportMode = suggestTransportMode(distance);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <MapPin size={20} color={Colors.primary} />
            <Text style={styles.title} numberOfLines={2}>
              {name}
            </Text>
          </View>
          <TouchableOpacity onPress={onToggleFavorite}>
            <Heart
              size={24}
              color={isFavorite ? Colors.error : Colors.textSecondary}
              fill={isFavorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ratingRow}>
          <Star size={16} color={Colors.warning} fill={Colors.warning} />
          <Text style={styles.ratingText}>
            {rating.toFixed(1)} / 5.0
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            Distance: {distance} km
          </Text>
          <Text style={styles.infoText}>
            ~{travelTime} min by {transportMode}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={onViewMap}
            style={styles.button}
            buttonColor={Colors.primary}
          >
            View on Map
          </Button>
          <Button
            mode="outlined"
            onPress={onAddReview}
            style={styles.button}
            textColor={Colors.primary}
          >
            Add Review
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 4,
    fontWeight: '600',
  },
  infoRow: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginVertical: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
