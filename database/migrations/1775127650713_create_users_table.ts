import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 255).nullable().unique()
      table.string('password_hash', 255).nullable()
      table.string('wechat_openid', 255).nullable().unique()
      table.integer('level').notNullable().defaultTo(1)
      table.integer('study_days').notNullable().defaultTo(0)
      table.json('user_medals').nullable()
      table.json('user_knowledge_radar').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
