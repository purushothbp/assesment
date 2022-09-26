import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientValidator from 'App/Validators/ClientValidator'
import Customer from '../../Models/Customer'

export default class CustomersController {
  public async insert({ request }: HttpContextContract) {
    const val = await request.validate(ClientValidator)
    console.log(request)
    let tab = new Customer()
    tab.customerId = val['customerId']
    tab.name = val['name']
    tab.owner = val['owner']
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
    const read = await Customer.query()
      .leftJoin('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('customers.*')
      .groupBy('customers.id')
      .count('hotels.customers_id as total')
      .then((d) =>
        d.map((h) => {
          const data = h.toJSON()
          return {
            ...data,
            total: h.$extras.total,
          }
        })
      )
    console.log(read)
    return read
  }
  public async search({ request }: HttpContextContract) {
    var search = request.input('search')
    const file = await Customer.query()
      .leftJoin('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('customers.*')
      .groupBy('customers.id')
      .count('hotels.customers_id as count')
      .if(search, (query) => {
        query.where((q) => {
          q.whereRaw(`customer_id::text ilike '%${search}%'`)
            .orWhereILike('customers.name', `%${search}%`)
            .orWhereILike('owner', `%${search}%`)
        })
      })
      .then((data) =>
        data.map((el) => {
          const data = el.toJSON()
          return {
            ...data,
            total: el.$extras.count,
          }
        })
      )
    console.log(file)
    return file
  }
  public async nameA() {
    const read = await Customer.query()
      .leftJoin('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('customers.*')
      .orderBy('name', 'asc')
      .groupBy('customers.id')
      .count('hotels.customers_id as total')
      .then((d) =>
        d.map((h) => {
          const data = h.toJSON()
          return {
            ...data,
            total: h.$extras.total,
          }
        })
      )
    console.log(read)
    return read
  }
  public async nameD() {
    const read = await Customer.query()
      .leftJoin('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('customers.*')
      .orderBy('name', 'desc')
      .groupBy('customers.id')
      .count('hotels.customers_id as total')
      .then((d) =>
        d.map((h) => {
          const data = h.toJSON()
          return {
            ...data,
            total: h.$extras.total,
          }
        })
      )
    console.log(read)
    return read
  }
}
