import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Building, MapPin } from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface HotelCardProps {
  name: string;
  address: string;
  distance: number;
  onViewMap: () => void;
}

export function HotelCard({
  name,
  address,
  distance,
  onViewMap,
}: HotelCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Building size={20} color={Colors.primary} />
          <Text style={styles.title} numberOfLines={2}>
            {name}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MapPin size={14} color={Colors.textSecondary} />
          <Text style={styles.address} numberOfLines={2}>
            {address}
          </Text>
        </View>

        <Text style={styles.distance}>
          {distance} km away
        </Text>

        <Button
          mode="contained"
          onPress={onViewMap}
          style={styles.button}
          buttonColor={Colors.primary}
        >
          View on Map
        </Button>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  address: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 12,
  },
  button: {
    marginTop: 4,
  },
});
