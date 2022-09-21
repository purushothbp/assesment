import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Hotel from '../../Models/Hotel'

export default class HotelsController {
  public async insert({ request }: HttpContextContract) {
    let tab = new Hotel()
    tab.name = request.input('name')
    tab.no = request.input('no')
    tab.street = request.input('street')
    tab.landmark = request.input('landmark')
    tab.area = request.input('area')
    tab.pincode = request.input('pincode')
    tab.save()
    // let address = `${hotels.no} ${hotels.street} ${hotels.landmark} ${hotels.area}`
    // return response.json({ address })
  }
  public async select() {
    return await Hotel.query().orderBy('id', 'asc')
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
    return await Database.from('hotels')
      .select('*')
      .where((query) => {
        if (/^[0-9]/.test(file)) {
          query.where('id', file).orWhere('pincode', 'ilike', `${file}`)
        }
      })
      .orWhere((query: any) => {
        query.orWhere('name', 'ilike', `%${file}%`)
      })
  }
  public async join() {
    const tablejoin = await Database.from('hotels')
      .join('customers', 'customers.name', '=', 'hotels.name')
      .select('*')
    return tablejoin
  }
  public async nameA() {
    return await Hotel.query().orderBy('name', 'asc')
  }
  public async nameD() {
    return await Hotel.query().orderBy('name', 'desc')
  }
}
