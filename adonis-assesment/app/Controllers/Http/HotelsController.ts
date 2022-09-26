import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from '../../Models/Hotel'
import Customer from '../../Models/Customer'
import Database from '@ioc:Adonis/Lucid/Database'
import ClientValidator from '../../Validators/ClientValidator'

export default class HotelsController {
  public async insert({ request }: HttpContextContract) {
    const val = await request.validate(ClientValidator)
    const tab = new Hotel()
    tab.customersId = val['customersId']
    tab.name = val['name']
    tab.no = val['no']
    tab.street = val['street']
    tab.landmark = val['landmark']
    tab.area = val['area']
    tab.pincode = val['pincode']
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
    var search = request.input('search')
    const file = await Customer.query()
      .select('*')
      .select('hotels.customers_id')
      .select('hotels.name')
      .as('hotelname')
      .select(
        Database.raw(
          `json_build_object('no', no, 'street', street, 'landMark', landmark,'area', area, 'pincode', pincode) as address`
        )
      )
      .join('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .where((query) => {
        if (/^[0-9]/.test(search)) {
          query.where('hotels.customers_id', search).orWhere('pincode', search)
        }
      })
      .orWhere((query) => {
        query
          .where('hotels.name', 'ilike', `%${search}%`)
          .orWhere('customers.name', 'ilike', `%${search}%`)
      })
      .then((data) =>
        data.map((el) => {
          const data = el.toJSON()
          return {
            ...data,
            name: el.$attributes.name,
            address: el.$extras.address,
            pincode: el.$extras.pincode,
          }
        })
      )
    console.log(file)
    return file
  }
  public async join() {
    const data = await Customer.query()
      .join('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('*')
      .select(
        Database.raw(
          `json_build_object('no', no, 'street', street, 'landMark', landmark,'area', area, 'pincode', pincode) as address`
        )
      )
      .then((d) =>
        d.map((h) => {
          const data = h.toJSON()
          return {
            ...data,
            address: h.$extras.address,
            pincode: h.$extras.pincode,
          }
        })
      )
    console.log(data)
    return data
  }
  public async nameA() {
    const data = await Customer.query()
      .join('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('*')
      .orderBy('hotels.name', 'asc')
      .select(
        Database.raw(
          `json_build_object('no', no, 'street', street, 'landMark', landmark,'area', area, 'pincode', pincode) as address`
        )
      )
      .then((d) =>
        d.map((h) => {
          const data = h.toJSON()
          return {
            ...data,
            address: h.$extras.address,
            pincode: h.$extras.pincode,
          }
        })
      )
    console.log(data)
    return data
  }
  public async nameD() {
    const data = await Customer.query()
      .join('hotels', 'hotels.customers_id', '=', 'customers.customer_id')
      .select('*')
      .orderBy('hotels.name', 'desc')
      .select(
        Database.raw(
          `json_build_object('no', no, 'street', street, 'landMark', landmark,'area', area, 'pincode', pincode) as address`
        )
      )
      .then((d) =>
        d.map((h) => {
          const data = h.toJSON()
          return {
            ...data,
            address: h.$extras.address,
            pincode: h.$extras.pincode,
          }
        })
      )
    console.log(data)
    return data
  }
}
