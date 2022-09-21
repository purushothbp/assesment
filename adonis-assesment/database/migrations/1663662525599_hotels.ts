import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'hotels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customers_id')
      table.string('name')
      table.integer('no')
      table.string('street')
      table.string('landmark')
      table.string('area')
      table.integer('pincode')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
