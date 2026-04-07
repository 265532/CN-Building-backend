import KnowledgeNode from '#models/knowledge_node'
import { Exception } from '@adonisjs/core/exceptions'

export class KnowledgeGraphService {
  /**
   * Get node details and its related nodes
   */
  async getNodeDetails(id: string) {
    const node = await KnowledgeNode.query()
      .where('id', id)
      .preload('relatedNodes', (query) => {
        query.select('id', 'title', 'type')
      })
      .first()

    if (!node) {
      throw new Exception('Knowledge node not found', { status: 400 })
    }

    return {
      id: node.id.toString(),
      title: node.title,
      content: node.content,
      type: node.type,
      comparisons: node.comparisons || [],
      relatedNodes: node.relatedNodes.map((related) => related.title), // Or return objects
    }
  }
}
