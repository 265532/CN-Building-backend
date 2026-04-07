import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class KnowledgeNode extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string | null

  @column()
  declare type: string | null

  @column()
  declare comparisons: any | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => KnowledgeNode, {
    pivotTable: 'knowledge_relations',
    pivotForeignKey: 'source_id',
    pivotRelatedForeignKey: 'target_id',
  })
  declare relatedNodes: ManyToMany<typeof KnowledgeNode>
}
