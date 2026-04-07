import ArchitecturePoint from '#models/architecture_point'
import db from '@adonisjs/lucid/services/db'

export class MapService {
  /**
   * Get map markers within viewport or specific category
   */
  async getMarkers(latitude: number, longitude: number, category?: string) {
    const query = ArchitecturePoint.query()

    if (category && category !== 'all') {
      query.where('category', category)
    }

    const points = await query.select('id', 'name', 'latitude', 'longitude', 'category', 'address')

    // Calculate approximate distance for each point (in km)
    return points.map((point) => {
      const dist = this.calculateDistance(latitude, longitude, point.latitude, point.longitude)
      return {
        id: point.id,
        name: point.name,
        latitude: point.latitude,
        longitude: point.longitude,
        category: point.category,
        address: point.address,
        distance: dist < 1 ? `${(dist * 1000).toFixed(0)}m` : `${dist.toFixed(1)}km`,
      }
    })
  }

  /**
   * Get nearby places sorted by distance
   */
  async getNearbyPlaces(latitude: number, longitude: number, category?: string) {
    // In a real production with PostGIS, we'd use ST_Distance.
    // For this MVP, we can fetch all points (or a bounded box) and sort in JS if dataset is small,
    // or use Haversine formula in raw SQL. Let's use raw SQL for sorting.

    let query = db
      .from('architecture_points')
      .select('id', 'name', 'address', 'category', 'latitude', 'longitude')
      .select(
        db.raw(
          `(
        6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
        )
      ) AS dist`,
          [latitude, longitude, latitude]
        )
      )

    if (category && category !== 'all') {
      query = query.where('category', category)
    }

    const places = await query.orderBy('dist', 'asc').limit(20)

    return places.map((place) => ({
      id: place.id,
      name: place.name,
      address: place.address,
      category: place.category,
      distance:
        place.dist < 1 ? `${(place.dist * 1000).toFixed(0)}m` : `${place.dist.toFixed(1)}km`,
    }))
  }

  /**
   * Haversine formula to calculate distance between two coordinates
   * Returns distance in km
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth radius in km
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}
