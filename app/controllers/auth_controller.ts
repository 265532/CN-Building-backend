import { type HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#services/auth_service'
import vine from '@vinejs/vine'

const accountLoginValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)

const accountRegisterValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(20),
    password: vine.string().minLength(6),
  })
)

const wechatLoginValidator = vine.compile(
  vine.object({
    code: vine.string(),
    encryptedData: vine.string().optional(),
    iv: vine.string().optional(),
  })
)

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  async accountLogin({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(accountLoginValidator)
      const data = await this.authService.accountLogin(payload.username, payload.password)

      return response.json({
        code: 200,
        message: 'success',
        data,
      })
    } catch (error: any) {
      return response.status(400).json({
        code: 400,
        message: error.message || 'Validation or login failed',
        data: null,
      })
    }
  }

  async accountRegister({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(accountRegisterValidator)
      const data = await this.authService.accountRegister(payload.username, payload.password)

      return response.json({
        code: 200,
        message: 'success',
        data,
      })
    } catch (error: any) {
      return response.status(400).json({
        code: 400,
        message: error.messages ? 'Validation failed' : error.message || 'Registration failed',
        data: error.messages || null,
      })
    }
  }

  async wechatLogin({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(wechatLoginValidator)
      const data = await this.authService.wechatLogin(
        payload.code,
        payload.encryptedData,
        payload.iv
      )

      return response.json({
        code: 200,
        message: 'success',
        data,
      })
    } catch (error: any) {
      return response.status(400).json({
        code: 400,
        message: error.message || 'WeChat login failed',
        data: null,
      })
    }
  }
}
