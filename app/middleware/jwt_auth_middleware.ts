import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { JwtUtil } from '#utils/jwt_util'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    jwtUserId?: number
  }
}

export default class JwtAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authHeader = ctx.request.header('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.response.status(401).json({
        code: 401,
        message: 'Unauthorized: Missing or invalid token',
        data: null,
      })
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = JwtUtil.verifyToken(token)
      ctx.jwtUserId = decoded.userId
      await next()
    } catch (error) {
      return ctx.response.status(401).json({
        code: 401,
        message: 'Unauthorized: Invalid or expired token',
        data: null,
      })
    }
  }
}
