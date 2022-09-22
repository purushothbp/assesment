import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from '../../Models/Hotel'
import Customer from '../../Models/Customer'

export default class HotelsController {
  public async insert({ request }: HttpContextContract) {
    let tab = new Hotel()
    tab.customersId = request.input('customersId')
    tab.name = request.input('name')
    tab.no = request.input('no')
    tab.street = request.input('street')
    tab.landmark = request.input('landmark')
    tab.area = request.input('area')
    tab.pincode = request.input('pincode')
    tab.save()
  }
  public async select() {
    const data = await Hotel.query().select()
    return data
  }
  public async update({ request }: HttpContextContract) {
    const update = await Hotel.findOrFail(request.params().id)
    update.name = request.input('name')
    update.no = request.input('no')
    update.street = request.input('street')
    update.landmark = request.input('landmark')
    update.area = request.input('area')
    update.pincode = request.input('pincode')
    await update.save()
  }
  public async delete({ request }: HttpContextContract) {
    const user = await Hotel.findByOrFail('id', request.params().id)
    user.delete()
    await user.save()
  }
  public async search({ request }: HttpContextContract) {
    const file = request.input('search')
    return await Hotel.query()
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
  public async join() {
    const data = await Customer.query()
      .join('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('*')
    const newData = data.map((el) =>
      Object.assign({}, el.$attributes, {
        pincode: el.$extras['pincode'],
        address:
          el.$extras['no'] +
          ',' +
          el.$extras['street'] +
          ',' +
          el.$extras['landmark'] +
          ',' +
          el.$extras['area'] +
          ',' +
          +el.$extras['pincode'] +
          ',',
      })
    )
    console.log(newData)
    return newData
  }
  public async nameA() {
    const data = await Customer.query()
      .join('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('*')
      .orderBy('hotels.name', 'asc')
    const newData = data.map((el) =>
      Object.assign({}, el.$attributes, {
        pincode: el.$extras['pincode'],
        address:
          el.$extras['no'] +
          ',' +
          el.$extras['street'] +
          ',' +
          el.$extras['landmark'] +
          ',' +
          el.$extras['area'] +
          ',' +
          +el.$extras['pincode'] +
          ',',
      })
    )
    console.log(newData)
    return newData
  }
  public async nameD() {
    const data = await Customer.query()
      .join('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('*')
      .orderBy('hotels.name', 'desc')
    const newData = data.map((el) =>
      Object.assign({}, el.$attributes, {
        pincode: el.$extras['pincode'],
        address:
          el.$extras['no'] +
          ',' +
          el.$extras['street'] +
          ',' +
          el.$extras['landmark'] +
          ',' +
          el.$extras['area'] +
          ',' +
          +el.$extras['pincode'] +
          ',',
      })
    )
    console.log(newData)
    return newData
  }
}
