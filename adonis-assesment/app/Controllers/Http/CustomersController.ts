import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from '../../Models/Customer'

export default class CustomersController {
  public async insert({ request }: HttpContextContract) {
    console.log(request)
    let tab = new Customer()
    tab.customerId = request.input('customerId')
    tab.name = request.input('name')
    tab.owner = request.input('owner')
    await tab.save()
    return 'Successfully Inserted'
  }
  public async select() {
    return await Customer.query().orderBy('id', 'asc')
  }
  public async update({ request }: HttpContextContract) {
    const update = await Customer.findOrFail(request.params().id)
    update.name = request.input('name')
    update.owner = request.input('owner')
    await update.save()
  }
  public async delete({ request }: HttpContextContract) {
    const user = await Customer.findByOrFail('id', request.params().id)
    user.delete()
    await user.save()
  }
  public async join() {
    const data = await Customer.query()
      .leftJoin('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('customers.*')
      .groupBy('hotels.customers_id', 'customers.id')
      .count('hotels.customers_id as total')
      .orderBy(`customers.*`, 'asc')
    return data
  }
  public async search({ request }: HttpContextContract) {
    const file = request.input('search')
    return await Customer.query()
      .select('*')
      .where((query) => {
        if (/^[0-9]/.test(file)) {
          query.where('id', file)
        }
      })
      .orWhere((query: any) => {
        query.orWhere('name', 'ilike', `%${file}%`)
      })
  }
  public async nameA() {
    return await Customer.query().orderBy('name', 'asc')
  }
  public async nameD() {
    return await Customer.query().orderBy('name', 'desc')
  }
}
