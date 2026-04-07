import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

export interface ImageMetadata {
  filename: string
  originalName: string
  extension: string
  mimeType: string
  size: number
  category: string
  type: string
  url: string
  createdAt: Date
  modifiedAt: Date
}

export interface ImageListResponse {
  items: ImageMetadata[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CategoryInfo {
  name: string
  count: number
  description: string
}

const STATIC_DIR = path.join(process.cwd(), 'static')

const MIME_TYPE_MAP: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

const CATEGORY_RULES: Array<{ pattern: RegExp; category: string; type: string }> = [
  { pattern: /故宫|皇宫|大殿/, category: '皇宫建筑', type: 'palace' },
  { pattern: /园林|法式园林/, category: '园林建筑', type: 'garden' },
  { pattern: /斗拱|木结构|榫卯/, category: '建筑构件', type: 'component' },
  { pattern: /飞檐|楼阁|阁楼|塔|黄鹤楼/, category: '楼阁建筑', type: 'pavilion' },
  { pattern: /希腊|柱式/, category: '跨文化对照', type: 'cross-cultural' },
  { pattern: /灯笼|装饰|非遗/, category: '建筑装饰', type: 'decoration' },
  { pattern: /拍照识别|AI/, category: 'AI功能', type: 'ai-feature' },
  { pattern: /标记|marker/i, category: '地图图标', type: 'marker' },
]

export class ImageService {
  private cache: Map<string, { data: ImageMetadata[]; timestamp: number }> = new Map()
  private readonly CACHE_TTL = 5 * 60 * 1000

  async getImageList(params: {
    page?: number
    limit?: number
    category?: string
    type?: string
    search?: string
  }): Promise<ImageListResponse> {
    const page = Math.max(1, params.page || 1)
    const limit = Math.min(Math.max(1, params.limit || 20), 100)
    const allImages = await this.getAllImages()

    let filteredImages = allImages

    if (params.category) {
      filteredImages = filteredImages.filter((img) => img.category === params.category)
    }

    if (params.type) {
      filteredImages = filteredImages.filter((img) => img.type === params.type)
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase()
      filteredImages = filteredImages.filter(
        (img) =>
          img.filename.toLowerCase().includes(searchLower) ||
          img.originalName.toLowerCase().includes(searchLower) ||
          img.category.toLowerCase().includes(searchLower)
      )
    }

    const total = filteredImages.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const items = filteredImages.slice(offset, offset + limit)

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    }
  }

  async getCategories(): Promise<CategoryInfo[]> {
    const allImages = await this.getAllImages()
    const categoryMap = new Map<string, { count: number; description: string }>()

    for (const image of allImages) {
      if (!categoryMap.has(image.category)) {
        categoryMap.set(image.category, {
          count: 0,
          description: this.getCategoryDescription(image.category),
        })
      }
      categoryMap.get(image.category)!.count++
    }

    return Array.from(categoryMap.entries()).map(([name, info]) => ({
      name,
      count: info.count,
      description: info.description,
    }))
  }

  async getImageMetadata(filename: string): Promise<ImageMetadata | null> {
    const sanitizedFilename = this.sanitizeFilename(filename)
    const filePath = path.join(STATIC_DIR, sanitizedFilename)

    try {
      if (!fs.existsSync(filePath)) {
        return null
      }

      const stats = fs.statSync(filePath)
      const ext = path.extname(filename).toLowerCase()

      return {
        filename: sanitizedFilename,
        originalName: filename,
        extension: ext,
        mimeType: MIME_TYPE_MAP[ext] || 'application/octet-stream',
        size: stats.size,
        category: this.categorizeImage(filename),
        type: this.getImageType(filename),
        url: `/api/v1/images/${encodeURIComponent(sanitizedFilename)}`,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
      }
    } catch (error) {
      console.error('Error reading image metadata:', error)
      return null
    }
  }

  getImagePath(filename: string): string | null {
    const sanitizedFilename = this.sanitizeFilename(filename)
    const filePath = path.join(STATIC_DIR, sanitizedFilename)

    if (fs.existsSync(filePath)) {
      return filePath
    }

    return null
  }

  generateETag(filePath: string): string {
    try {
      const stats = fs.statSync(filePath)
      const content = `${filePath}-${stats.mtime.getTime()}-${stats.size}`
      return createHash('md5').update(content).digest('hex')
    } catch {
      return createHash('md5').update(Date.now().toString()).digest('hex')
    }
  }

  private async getAllImages(): Promise<ImageMetadata[]> {
    const cacheKey = 'all_images'
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data
    }

    const images: ImageMetadata[] = []

    try {
      if (!fs.existsSync(STATIC_DIR)) {
        return images
      }

      const files = fs.readdirSync(STATIC_DIR)

      for (const file of files) {
        const filePath = path.join(STATIC_DIR, file)
        const ext = path.extname(file).toLowerCase()

        if (!MIME_TYPE_MAP[ext]) {
          continue
        }

        try {
          const stats = fs.statSync(filePath)

          if (!stats.isFile()) {
            continue
          }

          images.push({
            filename: file,
            originalName: file,
            extension: ext,
            mimeType: MIME_TYPE_MAP[ext],
            size: stats.size,
            category: this.categorizeImage(file),
            type: this.getImageType(file),
            url: `/api/v1/images/${encodeURIComponent(file)}`,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime,
          })
        } catch (error) {
          console.error(`Error reading file ${file}:`, error)
        }
      }

      images.sort((a, b) => a.filename.localeCompare(b.filename, 'zh-CN'))

      this.cache.set(cacheKey, { data: images, timestamp: Date.now() })
    } catch (error) {
      console.error('Error scanning static directory:', error)
    }

    return images
  }

  private categorizeImage(filename: string): string {
    for (const rule of CATEGORY_RULES) {
      if (rule.pattern.test(filename)) {
        return rule.category
      }
    }
    return '其他'
  }

  private getImageType(filename: string): string {
    for (const rule of CATEGORY_RULES) {
      if (rule.pattern.test(filename)) {
        return rule.type
      }
    }
    return 'other'
  }

  private getCategoryDescription(category: string): string {
    const descriptions: Record<string, string> = {
      皇宫建筑: '中国古代皇家宫殿建筑，如故宫等',
      园林建筑: '中国古典园林景观建筑',
      建筑构件: '古建筑结构构件，如斗拱、榫卯等',
      楼阁建筑: '古代楼阁塔式建筑，如黄鹤楼、应县木塔等',
      跨文化对照: '中西方建筑对比素材',
      建筑装饰: '建筑装饰元素，如灯笼、彩画等',
      AI功能: 'AI相关功能展示图片',
      地图图标: '地图标记和导航图标',
      其他: '未分类的图片资源',
    }
    return descriptions[category] || '未分类的图片资源'
  }

  private sanitizeFilename(filename: string): string {
    return path.basename(filename).replace(/\.\./g, '').replace(/\//g, '')
  }

  clearCache(): void {
    this.cache.clear()
  }
}
