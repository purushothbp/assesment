import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from '../../config/app'

export default class Client {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // eslint-disable-next-line eqeqeq
    if (appKey != request.header('appKey')) {
      response.send('Un Authorised Person')
      return
    }
    await next()
  }
}
module.exports = Client
