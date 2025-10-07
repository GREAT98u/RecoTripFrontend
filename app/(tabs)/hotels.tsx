import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import HotelsScreen from '../../screens/HotelsScreen';
import { EmptyState } from '../../components/EmptyState';
import { Hotel } from '../../services/api';

export default function HotelsTab() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (global.recommendationsData) {
      setUserLocation(global.recommendationsData.userLocation);
    }
  }, []);

  const handleViewMap = (hotel: Hotel) => {
    Alert.alert('Map View', `Opening map for ${hotel.name}`);
  };

  if (!userLocation) {
    return (
      <EmptyState message="Location not available. Go to Home and find attractions first!" />
    );
  }

  return (
    <HotelsScreen
      userLocation={userLocation}
      onViewMap={handleViewMap}
    />
  );
}
