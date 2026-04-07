import { type HttpContext } from '@adonisjs/core/http'
import { KnowledgeGraphService } from '#services/knowledge_graph_service'

export default class KnowledgeNodeController {
  private kgService: KnowledgeGraphService

  constructor() {
    this.kgService = new KnowledgeGraphService()
  }

  /**
   * GET /api/v1/knowledge-nodes/:id
   */
  async show({ params }: HttpContext) {
    return await this.kgService.getNodeDetails(params.id)
  }
}
