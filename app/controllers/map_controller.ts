import { type HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { MapService } from '#services/map_service'

const getMapDataValidator = vine.compile(
  vine.object({
    latitude: vine.number(),
    longitude: vine.number(),
    category: vine.string().optional(),
  })
)

export default class MapController {
  private mapService: MapService

  constructor() {
    this.mapService = new MapService()
  }

  /**
   * GET /api/v1/maps/markers
   */
  async getMarkers({ request }: HttpContext) {
    const payload = await request.validateUsing(getMapDataValidator)
    return await this.mapService.getMarkers(payload.latitude, payload.longitude, payload.category)
  }

  /**
   * GET /api/v1/maps/places
   */
  async getPlaces({ request }: HttpContext) {
    const payload = await request.validateUsing(getMapDataValidator)
    return await this.mapService.getNearbyPlaces(
      payload.latitude,
      payload.longitude,
      payload.category
    )
  }
}
