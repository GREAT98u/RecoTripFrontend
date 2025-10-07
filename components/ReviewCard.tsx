import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { Star } from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface ReviewCardProps {
  placeName: string;
  rating: number;
  comment: string;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ReviewCard({
  placeName,
  rating,
  comment,
  date,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.placeName} numberOfLines={1}>
              {placeName}
            </Text>
            <View style={styles.ratingRow}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  color={index < rating ? Colors.warning : Colors.textSecondary}
                  fill={index < rating ? Colors.warning : 'transparent'}
                />
              ))}
            </View>
          </View>
          <View style={styles.actions}>
            {onEdit && (
              <IconButton
                icon="pencil"
                size={20}
                onPress={onEdit}
                iconColor={Colors.primary}
              />
            )}
            {onDelete && (
              <IconButton
                icon="delete"
                size={20}
                onPress={onDelete}
                iconColor={Colors.error}
              />
            )}
          </View>
        </View>

        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
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
    marginBottom: 8,
  },
  titleSection: {
    flex: 1,
    marginRight: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    marginTop: -8,
    marginRight: -8,
  },
  comment: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
