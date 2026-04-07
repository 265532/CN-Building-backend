import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'knowledge_relations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('source_id')
        .unsigned()
        .references('id')
        .inTable('knowledge_nodes')
        .onDelete('CASCADE')
      table
        .integer('target_id')
        .unsigned()
        .references('id')
        .inTable('knowledge_nodes')
        .onDelete('CASCADE')
      table.string('relation_type', 100).nullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.unique(['source_id', 'target_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
