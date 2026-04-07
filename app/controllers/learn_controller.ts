import { type HttpContext } from '@adonisjs/core/http'
import { LearnService } from '#services/learn_service'

export default class LearnController {
  private learnService: LearnService

  constructor() {
    this.learnService = new LearnService()
  }

  /**
   * GET /api/v1/learn/paths
   */
  async getPaths({}: HttpContext) {
    return await this.learnService.getLearningPaths()
  }

  /**
   * POST /api/v1/learn/record
   */
  async recordDaily(ctx: HttpContext) {
    const userId = ctx.jwtUserId!
    return await this.learnService.recordDailyStudy(userId)
  }
}
