import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Hotel, fetchNearbyHotels } from '../services/api';
import { HotelCard } from '../components/HotelCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingScreen } from '../components/LoadingScreen';
import { Colors } from '../constants/colors';
import { calculateDistance } from '../utils/distance';

interface HotelsScreenProps {
  userLocation: { latitude: number; longitude: number } | null;
  onViewMap: (hotel: Hotel) => void;
}

export default function HotelsScreen({
  userLocation,
  onViewMap,
}: HotelsScreenProps) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userLocation) {
      loadHotels();
    }
  }, [userLocation]);

  const loadHotels = async () => {
    if (!userLocation) return;

    setLoading(true);
    try {
      const data = await fetchNearbyHotels(
        userLocation.latitude,
        userLocation.longitude,
        5
      );
      setHotels(data);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to load nearby hotels. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getDistance = (hotel: Hotel): number => {
    if (!userLocation) return 0;
    return calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      hotel.lat,
      hotel.lon
    );
  };

  const renderHotel = ({ item }: { item: Hotel }) => {
    const distance = getDistance(item);
    return (
      <HotelCard
        name={item.name}
        address={item.address || 'Address not available'}
        distance={distance}
        onViewMap={() => onViewMap(item)}
      />
    );
  };

  if (loading) {
    return <LoadingScreen message="Finding nearby hotels..." />;
  }

  if (!userLocation) {
    return (
      <EmptyState message="Location not available. Please enable location access." />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Hotels</Text>
        <Text style={styles.subtitle}>
          Found {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} within 5km
        </Text>
      </View>

      {hotels.length === 0 ? (
        <EmptyState message="No hotels found in this area" />
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotel}
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
