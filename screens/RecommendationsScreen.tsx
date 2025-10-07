import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { List, Map } from 'lucide-react-native';
import { Place } from '../services/api';
import { PlaceCard } from '../components/PlaceCard';
import { EmptyState } from '../components/EmptyState';
import { Colors } from '../constants/colors';
import { calculateDistance } from '../utils/distance';
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from '../services/storage';

interface RecommendationsScreenProps {
  places: Place[];
  userLocation: { latitude: number; longitude: number } | null;
  onViewMap: (place: Place) => void;
  onAddReview: (place: Place) => void;
}

export default function RecommendationsScreen({
  places,
  userLocation,
  onViewMap,
  onAddReview,
}: RecommendationsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    filterPlaces();
  }, [searchQuery, places]);

  const loadFavorites = async () => {
    const favSet = new Set<string>();
    for (const place of places) {
      const isFav = await isFavorite(place.name);
      if (isFav) {
        favSet.add(place.name);
      }
    }
    setFavorites(favSet);
  };

  const filterPlaces = () => {
    if (!searchQuery.trim()) {
      setFilteredPlaces(places);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = places.filter((place) =>
      place.name.toLowerCase().includes(query)
    );
    setFilteredPlaces(filtered);
  };

  const handleToggleFavorite = async (place: Place) => {
    try {
      const isFav = favorites.has(place.name);
      if (isFav) {
        await removeFavorite(place.name);
        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(place.name);
          return newSet;
        });
      } else {
        await addFavorite({
          name: place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          rating: place.rating,
        });
        setFavorites((prev) => new Set(prev).add(place.name));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const getDistance = (place: Place): number => {
    if (!userLocation) return 0;
    return calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      place.latitude,
      place.longitude
    );
  };

  const renderPlace = ({ item }: { item: Place }) => {
    const distance = getDistance(item);
    return (
      <PlaceCard
        name={item.name}
        rating={item.rating}
        distance={distance}
        onViewMap={() => onViewMap(item)}
        onAddReview={() => onAddReview(item)}
        onToggleFavorite={() => handleToggleFavorite(item)}
        isFavorite={favorites.has(item.name)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommended Places</Text>
        <Text style={styles.subtitle}>
          Found {places.length} attraction{places.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <Searchbar
        placeholder="Search places..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {filteredPlaces.length === 0 ? (
        <EmptyState
          message={
            searchQuery
              ? 'No places match your search'
              : 'No recommendations found'
          }
        />
      ) : (
        <FlatList
          data={filteredPlaces}
          renderItem={renderPlace}
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
    paddingTop: 16,
    paddingBottom: 8,
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
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  list: {
    paddingBottom: 16,
  },
});
