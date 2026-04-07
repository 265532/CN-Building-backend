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

  async accountLogin({ request }: HttpContext) {
    const payload = await request.validateUsing(accountLoginValidator)
    return await this.authService.accountLogin(payload.username, payload.password)
  }

  async accountRegister({ request }: HttpContext) {
    const payload = await request.validateUsing(accountRegisterValidator)
    return await this.authService.accountRegister(payload.username, payload.password)
  }

  async wechatLogin({ request }: HttpContext) {
    const payload = await request.validateUsing(wechatLoginValidator)
    return await this.authService.wechatLogin(payload.code, payload.encryptedData, payload.iv)
  }
}
