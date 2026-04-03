import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import logger from '@adonisjs/core/services/logger'

export default class LogRequestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request } = ctx

    logger.info(`Incoming request: ${request.method()} ${request.url()}`)

    await next()

    logger.info(
      `Outgoing response: ${request.method()} ${request.url()} - ${ctx.response.getStatus()}`
    )
  }
}
