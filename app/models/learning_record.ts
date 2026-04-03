import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import ArchitecturePoint from './architecture_point.js'

export default class LearningRecord extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare architecturePointId: number

  @column()
  declare isCheckedIn: boolean

  @column()
  declare masteryLevel: number

  @column()
  declare radarData: Record<string, any> | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => ArchitecturePoint)
  declare architecturePoint: BelongsTo<typeof ArchitecturePoint>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
