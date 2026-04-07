import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserAchievement extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare achievementId: number

  @column.dateTime({ autoCreate: true })
  declare unlockedAt: DateTime
}
