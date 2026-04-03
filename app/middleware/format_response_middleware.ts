import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class FormatResponseMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await next()

    const { response } = ctx
    const body = response.getBody()
    const statusCode = response.getStatus()

    // We don't format if it's an error response (already formatted by handler)
    // or if the response is empty, or a stream/buffer
    if (statusCode >= 400) {
      return
    }

    if (body !== undefined && typeof body !== 'string' && !Buffer.isBuffer(body)) {
      if (
        body &&
        typeof body === 'object' &&
        'code' in body &&
        'message' in body &&
        'data' in body
      ) {
        return
      }

      response.send({
        code: statusCode || 200,
        message: 'success',
        data: body,
      })
    } else if (body === undefined) {
      response.send({
        code: statusCode || 200,
        message: 'success',
        data: null,
      })
    }
  }
}
