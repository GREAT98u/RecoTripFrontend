import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import FavoritesScreen from '../../screens/FavoritesScreen';
import { Favorite } from '../../services/storage';

export default function FavoritesTab() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (global.recommendationsData) {
      setUserLocation(global.recommendationsData.userLocation);
    }
  }, []);

  const handleViewMap = (place: Favorite) => {
    Alert.alert('Map View', `Opening map for ${place.name}`);
  };

  return (
    <FavoritesScreen
      userLocation={userLocation}
      onViewMap={handleViewMap}
    />
  );
}
