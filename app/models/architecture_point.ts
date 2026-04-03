import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import LearningRecord from './learning_record.js'

export default class ArchitecturePoint extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  @column()
  declare dynasty: string | null

  @column()
  declare category: string | null

  @column()
  declare description: string | null

  @column()
  declare imageUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => LearningRecord)
  declare learningRecords: HasMany<typeof LearningRecord>
}
