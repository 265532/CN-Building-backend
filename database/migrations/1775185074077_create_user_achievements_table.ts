import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_achievements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('achievement_id')
        .unsigned()
        .references('id')
        .inTable('achievements')
        .onDelete('CASCADE')
      table.timestamp('unlocked_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['user_id', 'achievement_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
