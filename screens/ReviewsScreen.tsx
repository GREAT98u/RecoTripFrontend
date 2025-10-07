import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Star } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ReviewCard } from '../components/ReviewCard';
import { EmptyState } from '../components/EmptyState';
import { Colors } from '../constants/colors';
import {
  Review,
  getReviews,
  addReview,
  deleteReview,
  updateReview,
} from '../services/storage';

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [placeName, setPlaceName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadReviews();
    }, [])
  );

  const loadReviews = async () => {
    const data = await getReviews();
    setReviews(data);
  };

  const handleSubmit = async () => {
    if (!placeName.trim()) {
      Alert.alert('Error', 'Please enter a place name');
      return;
    }
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    try {
      if (editingId) {
        await updateReview(editingId, {
          placeName: placeName.trim(),
          comment: comment.trim(),
          rating,
        });
        setEditingId(null);
      } else {
        await addReview({
          placeName: placeName.trim(),
          comment: comment.trim(),
          rating,
        });
      }

      setPlaceName('');
      setComment('');
      setRating(0);
      await loadReviews();
    } catch (error) {
      Alert.alert('Error', 'Failed to save review');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setPlaceName(review.placeName);
    setComment(review.comment);
    setRating(review.rating);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview(id);
              await loadReviews();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete review');
            }
          },
        },
      ]
    );
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setPlaceName('');
    setComment('');
    setRating(0);
  };

  const renderReview = ({ item }: { item: Review }) => (
    <ReviewCard
      placeName={item.placeName}
      rating={item.rating}
      comment={item.comment}
      date={item.date}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>
            {editingId ? 'Edit Review' : 'Add New Review'}
          </Text>

          <TextInput
            label="Place Name"
            value={placeName}
            onChangeText={setPlaceName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Your Review"
            value={comment}
            onChangeText={setComment}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={32}
                  color={
                    index < rating ? Colors.warning : Colors.textSecondary
                  }
                  fill={index < rating ? Colors.warning : 'transparent'}
                  onPress={() => setRating(index + 1)}
                />
              ))}
            </View>
          </View>

          <View style={styles.buttonRow}>
            {editingId && (
              <Button
                mode="outlined"
                onPress={handleCancelEdit}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit}
              buttonColor={Colors.primary}
              style={styles.submitButton}
            >
              {editingId ? 'Update Review' : 'Submit Review'}
            </Button>
          </View>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Your Reviews</Text>
          {reviews.length === 0 ? (
            <EmptyState message="No reviews yet. Add your first review above!" />
          ) : (
            <FlatList
              data={reviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.reviewsList}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  formSection: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  ratingSection: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
  reviewsSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  reviewsList: {
    paddingBottom: 16,
  },
});
