import axios from 'axios';
import { API_BASE_URL, RECOMMEND_ENDPOINT } from '../constants/api';

export interface Place {
  name: string;
  latitude: number;
  longitude: number;
  rating: number;
  final_score: number;
}

export interface RecommendationRequest {
  lat: number;
  lon: number;
  prefs?: string;
}

export async function fetchRecommendations(
  request: RecommendationRequest
): Promise<Place[]> {
  try {
    const response = await axios.post<Place[]>(
      `${API_BASE_URL}${RECOMMEND_ENDPOINT}`,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch recommendations'
      );
    }
    throw error;
  }
}

export interface Hotel {
  name: string;
  lat: number;
  lon: number;
  address?: string;
}

export async function fetchNearbyHotels(
  lat: number,
  lon: number,
  radiusKm: number = 5
): Promise<Hotel[]> {
  try {
    const radius = radiusKm * 1000;
    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    const query = `
      [out:json];
      node
        [amenity=hotel]
        (around:${radius},${lat},${lon});
      out body;
    `;

    const response = await axios.post(
      overpassUrl,
      `data=${encodeURIComponent(query)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 15000,
      }
    );

    const hotels: Hotel[] = response.data.elements.map((element: any) => ({
      name: element.tags?.name || 'Unnamed Hotel',
      lat: element.lat,
      lon: element.lon,
      address: element.tags?.['addr:street'] || 'Address not available',
    }));

    return hotels;
  } catch (error) {
    throw new Error('Failed to fetch nearby hotels');
  }
}
