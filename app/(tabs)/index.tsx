import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import HomeScreen from '../../screens/HomeScreen';
import { LoadingScreen } from '../../components/LoadingScreen';
import { fetchRecommendations, Place } from '../../services/api';

export default function HomeTab() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFindAttractions = async () => {
    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable location access to find nearby attractions.'
        );
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const places = await fetchRecommendations({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        prefs: '',
      });

      global.recommendationsData = {
        places,
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      };

      router.push('/recommendations');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to fetch recommendations. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Finding attractions near you..." />;
  }

  return <HomeScreen onFindAttractions={handleFindAttractions} />;
}
