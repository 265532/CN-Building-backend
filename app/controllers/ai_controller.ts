import { type HttpContext } from '@adonisjs/core/http'
import { AiService } from '#services/ai_service'
import vine from '@vinejs/vine'

const chatValidator = vine.compile(
  vine.object({
    messages: vine.array(
      vine.object({
        role: vine.string(),
        content: vine.string(),
      })
    ),
    imageUrl: vine.string().optional(),
    stream: vine.boolean().optional(),
  })
)

export default class AiController {
  private aiService: AiService

  constructor() {
    this.aiService = new AiService()
  }

  /**
   * POST /api/v1/ai/chats
   */
  async chat({ request, response }: HttpContext) {
    const payload = await request.validateUsing(chatValidator)

    if (payload.stream) {
      response.header('Content-Type', 'text/event-stream')
      response.header('Cache-Control', 'no-cache')
      response.header('Connection', 'keep-alive')

      const stream = await this.aiService.chatStream(payload.messages, payload.imageUrl)
      return response.stream(stream)
    } else {
      // Mock non-streaming response
      return {
        reply: '这是一个非流式的古建筑导学回复。',
      }
    }
  }
}
