import { type HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user_service'
import vine from '@vinejs/vine'

const updateUserInfoValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(20).optional(),
  })
)

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  /**
   * GET /api/v1/user/info
   */
  async getInfo(ctx: HttpContext) {
    const { response, jwtUserId } = ctx
    const userId = jwtUserId

    if (!userId) {
      return response.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: null,
      })
    }

    try {
      const data = await this.userService.getUserInfo(userId)
      return response.json({
        code: 200,
        message: 'success',
        data,
      })
    } catch (error: any) {
      return response.status(400).json({
        code: 400,
        message: error.message || 'Failed to get user info',
        data: null,
      })
    }
  }

  /**
   * PUT /api/v1/user/info
   */
  async updateInfo(ctx: HttpContext) {
    const { request, response, jwtUserId } = ctx
    const userId = jwtUserId

    if (!userId) {
      return response.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: null,
      })
    }

    try {
      const payload = await request.validateUsing(updateUserInfoValidator)
      const data = await this.userService.updateUserInfo(userId, payload)
      return response.json({
        code: 200,
        message: 'success',
        data,
      })
    } catch (error: any) {
      return response.status(400).json({
        code: 400,
        message: error.messages
          ? 'Validation failed'
          : error.message || 'Failed to update user info',
        data: error.messages || null,
      })
    }
  }

  /**
   * GET /api/v1/user/achievements
   */
  async getAchievements(ctx: HttpContext) {
    const { response, jwtUserId } = ctx
    const userId = jwtUserId

    if (!userId) {
      return response.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: null,
      })
    }

    try {
      const data = await this.userService.getUserAchievements(userId)
      return response.json({
        code: 200,
        message: 'success',
        data,
      })
    } catch (error: any) {
      return response.status(400).json({
        code: 400,
        message: error.message || 'Failed to get achievements',
        data: null,
      })
    }
  }
}
