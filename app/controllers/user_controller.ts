import { type HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import { AchievementService } from '#services/achievement_service'
import vine from '@vinejs/vine'

const updateUserInfoValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(20).optional(),
  })
)

export default class UserController {
  private userService: UserService
  private achievementService: AchievementService

  constructor() {
    this.userService = new UserService()
    this.achievementService = new AchievementService()
  }

  /**
   * GET /api/v1/users/me
   */
  async getInfo(ctx: HttpContext) {
    const userId = ctx.jwtUserId!
    return await this.userService.getUserInfo(userId)
  }

  /**
   * PUT /api/v1/users/me
   */
  async updateInfo(ctx: HttpContext) {
    const { request, jwtUserId } = ctx
    const userId = jwtUserId!

    const payload = await request.validateUsing(updateUserInfoValidator)
    return await this.userService.updateUserInfo(userId, payload)
  }

  /**
   * GET /api/v1/users/achievements
   */
  async getAchievements(ctx: HttpContext) {
    const userId = ctx.jwtUserId!
    return await this.achievementService.getUserAchievements(userId)
  }
}
