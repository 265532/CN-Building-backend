import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import LearningRecord from './learning_record.js'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends compose(BaseModel, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare passwordHash: string | null

  @column()
  declare wechatOpenid: string | null

  @column()
  declare level: number

  @column()
  declare studyDays: number

  @column()
  declare userMedals: any | null

  @column()
  declare userKnowledgeRadar: any | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => LearningRecord)
  declare learningRecords: HasMany<typeof LearningRecord>
}
