import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import RecommendationsScreen from '../../screens/RecommendationsScreen';
import { EmptyState } from '../../components/EmptyState';
import { Place } from '../../services/api';

declare global {
  var recommendationsData: {
    places: Place[];
    userLocation: { latitude: number; longitude: number };
  } | undefined;
}

export default function RecommendationsTab() {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (global.recommendationsData) {
      setPlaces(global.recommendationsData.places);
      setUserLocation(global.recommendationsData.userLocation);
    }
  }, []);

  const handleViewMap = (place: Place) => {
    Alert.alert('Map View', `Opening map for ${place.name}`);
  };

  const handleAddReview = (place: Place) => {
    router.push('/reviews');
  };

  if (!places.length || !userLocation) {
    return (
      <EmptyState message="No recommendations available. Go to Home and find attractions first!" />
    );
  }

  return (
    <RecommendationsScreen
      places={places}
      userLocation={userLocation}
      onViewMap={handleViewMap}
      onAddReview={handleAddReview}
    />
  );
}
