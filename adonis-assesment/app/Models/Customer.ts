import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customer extends BaseModel {
  @column({})
  public id: number
  @column({})
  public name: string
  @column({})
  public owner: string
}
