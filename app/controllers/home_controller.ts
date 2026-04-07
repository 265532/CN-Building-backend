import { type HttpContext } from '@adonisjs/core/http'
import { HomeService } from '#services/home_service'

export default class HomeController {
  private homeService: HomeService

  constructor() {
    this.homeService = new HomeService()
  }

  /**
   * GET /api/v1/home/data
   */
  async getData({}: HttpContext) {
    return await this.homeService.getHomeData()
  }
}
