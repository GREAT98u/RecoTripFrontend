/**
 * Helper function to convert degrees to radians.
 * Used in the Haversine formula for distance calculation.
 */
const toRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };
  
  /**
   * Calculates the distance between two geographical points using the Haversine formula.
   * @param lat1 Latitude of point 1 (e.g., User Location)
   * @param lon1 Longitude of point 1 (e.g., User Location)
   * @param lat2 Latitude of point 2 (e.g., Place/Hotel Location)
   * @param lon2 Longitude of point 2 (e.g., Place/Hotel Location)
   * @returns Distance in kilometers, rounded to 1 decimal place.
   */
  export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Round to one decimal place
    return Math.round(R * c * 10) / 10;
  }
  
  // Default travel speed assumption for car/light transit, based on project README
  const speedKmH = 40; 
  const speedWalkKmH = 5;
  
  /**
   * Calculates estimated travel time in minutes based on distance.
   * Assumes a default speed of 40 km/h for the calculation used in the card.
   * @param distance Distance in kilometers.
   * @returns Estimated travel time in minutes, rounded to the nearest minute.
   */
  export function calculateTravelTime(distance: number): number {
    const timeHours = distance / speedKmH;
    return Math.round(timeHours * 60);
  }
  
  /**
   * Suggests a transport mode based on distance.
   * @param distance Distance in kilometers.
   * @returns Suggested transport mode as a string.
   */
  export function suggestTransportMode(distance: number): string {
    if (distance < 1.5) {
      const timeMinutes = Math.round(distance / speedWalkKmH * 60);
      return `walk (${timeMinutes} min)`;
    }
    if (distance < 5) {
      return 'bike/transit';
    }
    return 'car/transit';
  }
  