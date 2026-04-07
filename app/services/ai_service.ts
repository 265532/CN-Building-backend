import OpenAI from 'openai'
import env from '#start/env'

export class AiService {
  private openai: OpenAI | null = null

  constructor() {
    const apiKey = process.env.ALI_KEY || env.get('ALI_KEY')
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      })
    }
  }

  /**
   * Streaming chat with Aliyun Qwen via OpenAI compatible API.
   */
  async chatStream(messages: any[], _imageUrl?: string): Promise<ReadableStream> {
    const encoder = new TextEncoder()

    if (!this.openai) {
      // Fallback to mock if no API key is provided
      const chunks = [
        '这',
        '是',
        '一',
        '个',
        '缺',
        '乏',
        'A',
        'P',
        'I',
        ' ',
        'K',
        'e',
        'y',
        '的',
        '测',
        '试',
        '流',
        '式',
        '回',
        '复',
        '。',
        '\n',
      ]

      return new ReadableStream({
        async start(controller) {
          for (const chunk of chunks) {
            await new Promise((resolve) => setTimeout(resolve, 100))
            const sseData = `data: ${JSON.stringify({ text: chunk })}\n\n`
            controller.enqueue(encoder.encode(sseData))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        },
      })
    }

    try {
      const stream = await this.openai.chat.completions.create({
        model: 'qwen3.5-27b',
        messages: messages,
        stream: true,
      })

      return new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content || ''
              if (content) {
                const sseData = `data: ${JSON.stringify({ text: content })}\n\n`
                controller.enqueue(encoder.encode(sseData))
              }
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          } catch (error) {
            console.error('Stream reading error:', error)
            controller.error(error)
          }
        },
      })
    } catch (error) {
      console.error('OpenAI API request error:', error)
      throw new Error('Failed to communicate with AI service')
    }
  }
}
