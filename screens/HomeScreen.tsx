import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Compass, MapPin } from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface HomeScreenProps {
  onFindAttractions: () => void;
}

export default function HomeScreen({ onFindAttractions }: HomeScreenProps) {
  return (
    <LinearGradient
      colors={[Colors.gradient.start, Colors.gradient.end]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Compass size={80} color={Colors.primary} />
          <Text style={styles.appName}>RecoTrip</Text>
          <Text style={styles.tagline}>Explore the world around you</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.featureCard}>
            <MapPin size={32} color={Colors.primary} />
            <Text style={styles.featureTitle}>
              Discover Amazing Places
            </Text>
            <Text style={styles.featureText}>
              Get AI-powered recommendations for nearby tourist attractions
              based on your current location.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={onFindAttractions}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Find Nearby Attractions</Text>
          </TouchableOpacity>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>What you'll discover:</Text>
            <View style={styles.infoList}>
              <Text style={styles.infoItem}>
                Tourist attractions with ratings
              </Text>
              <Text style={styles.infoItem}>
                Nearby hotels and accommodations
              </Text>
              <Text style={styles.infoItem}>
                Travel distance and time estimates
              </Text>
              <Text style={styles.infoItem}>
                Save your favorite places
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 16,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
  featureCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 32,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  mainButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    marginTop: 40,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    paddingLeft: 8,
  },
});
