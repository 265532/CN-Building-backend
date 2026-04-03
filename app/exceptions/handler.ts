import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@adonisjs/core'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_HTTP_EXCEPTION) {
      return ctx.response.status(error.status).send({
        code: error.status,
        message: error.message,
        data: null,
      })
    }

    if ((error as any).code === 'E_VALIDATION_ERROR') {
      return ctx.response.status(422).send({
        code: 422,
        message: 'Validation Error',
        data: (error as any).messages,
      })
    }

    const status = (error as any).status || 500
    const message = (error as any).message || 'Internal Server Error'

    return ctx.response.status(status).send({
      code: status,
      message: app.inProduction ? 'Internal Server Error' : message,
      data: app.inProduction ? null : { stack: (error as any).stack },
    })
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
