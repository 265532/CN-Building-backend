import { type HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs'
import { ImageService } from '#services/image_service'

export default class ImageController {
  private imageService: ImageService

  constructor() {
    this.imageService = new ImageService()
  }

  async list({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    const category = request.input('category')
    const type = request.input('type')
    const search = request.input('search')

    const result = await this.imageService.getImageList({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      category,
      type,
      search,
    })

    return result
  }

  async categories({}: HttpContext) {
    const categories = await this.imageService.getCategories()
    return categories
  }

  async show({ params, request, response }: HttpContext) {
    const filename = params.filename
    const filePath = this.imageService.getImagePath(filename)

    if (!filePath) {
      response.status(404)
      return {
        code: 404,
        message: 'Image not found',
        data: null,
      }
    }

    try {
      const stats = fs.statSync(filePath)
      const etag = this.imageService.generateETag(filePath)

      const ifNoneMatch = request.header('if-none-match')
      if (ifNoneMatch && ifNoneMatch === etag) {
        response.status(304)
        return
      }

      const fileStream = fs.createReadStream(filePath)

      response
        .header('Content-Type', 'image/jpeg')
        .header('Content-Length', stats.size.toString())
        .header('ETag', etag)
        .header('Cache-Control', 'public, max-age=86400')
        .header('Last-Modified', stats.mtime.toUTCString())
        .stream(fileStream)
    } catch (error) {
      console.error('Error serving image:', error)
      response.status(500)
      return {
        code: 500,
        message: 'Internal server error',
        data: null,
      }
    }
  }

  async metadata({ params, response }: HttpContext) {
    const filename = params.filename
    const metadata = await this.imageService.getImageMetadata(filename)

    if (!metadata) {
      response.status(404)
      return {
        code: 404,
        message: 'Image not found',
        data: null,
      }
    }

    return metadata
  }
}
