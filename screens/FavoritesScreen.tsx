import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { PlaceCard } from '../components/PlaceCard';
import { EmptyState } from '../components/EmptyState';
import { Colors } from '../constants/colors';
import { Favorite, getFavorites, removeFavorite } from '../services/storage';
// Import the shared utility function to calculate distance
import { calculateDistance } from '../utils/distance';

interface FavoritesScreenProps {
  userLocation: { latitude: number; longitude: number } | null;
  onViewMap: (place: Favorite) => void;
}

export default function FavoritesScreen({
  userLocation,
  onViewMap,
}: FavoritesScreenProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleRemoveFavorite = async (placeName: string) => {
    Alert.alert(
      'Remove Favorite',
      'Remove this place from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFavorite(placeName);
              await loadFavorites();
            } catch (error) {
              Alert.alert('Error', 'Failed to remove favorite');
            }
          },
        },
      ]
    );
  };

  // Use the imported calculateDistance utility
  const getDistance = (place: Favorite): number => {
    if (!userLocation) return 0;
    return calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      place.latitude,
      place.longitude
    );
  };

  // Removed redundant 'toRad' function as it is now inside utils/distance.ts

  const renderFavorite = ({ item }: { item: Favorite }) => {
    const distance = getDistance(item);
    return (
      <PlaceCard
        name={item.name}
        rating={item.rating}
        distance={distance}
        onViewMap={() => onViewMap(item)}
        onAddReview={() => {}}
        onToggleFavorite={() => handleRemoveFavorite(item.name)}
        isFavorite={true}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Places</Text>
        <Text style={styles.subtitle}>
          {favorites.length} saved place{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {favorites.length === 0 ? (
        <EmptyState message="No favorite places yet. Start exploring and add your favorites!" />
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  list: {
    paddingBottom: 16,
  },
});
