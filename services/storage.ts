import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@recotrip_favorites';
const REVIEWS_KEY = '@recotrip_reviews';

export interface Review {
  id: string;
  placeName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Favorite {
  name: string;
  latitude: number;
  longitude: number;
  rating: number;
}

export async function getFavorites(): Promise<Favorite[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
}

export async function addFavorite(place: Favorite): Promise<void> {
  try {
    const favorites = await getFavorites();
    const exists = favorites.some((f) => f.name === place.name);
    if (!exists) {
      favorites.push(place);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
    throw error;
  }
}

export async function removeFavorite(placeName: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const updated = favorites.filter((f) => f.name !== placeName);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
}

export async function isFavorite(placeName: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((f) => f.name === placeName);
}

export async function getReviews(): Promise<Review[]> {
  try {
    const data = await AsyncStorage.getItem(REVIEWS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading reviews:', error);
    return [];
  }
}

export async function addReview(review: Omit<Review, 'id' | 'date'>): Promise<void> {
  try {
    const reviews = await getReviews();
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    reviews.unshift(newReview);
    await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch (error) {
    console.error('Error saving review:', error);
    throw error;
  }
}

export async function deleteReview(id: string): Promise<void> {
  try {
    const reviews = await getReviews();
    const updated = reviews.filter((r) => r.id !== id);
    await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}

export async function updateReview(
  id: string,
  updates: Partial<Omit<Review, 'id' | 'date'>>
): Promise<void> {
  try {
    const reviews = await getReviews();
    const index = reviews.findIndex((r) => r.id === id);
    if (index !== -1) {
      reviews[index] = { ...reviews[index], ...updates };
      await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    }
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
}
