import type { HttpContext } from '@adonisjs/core/http'

export default class NotasController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    let notasDatabase=[
        {id:1,titulo:'nota 1',conteudo:'nota 1',autor:'marcelo'},
        {id:2,titulo:'nota 2',conteudo:'nota 1',autor:'marcelo'},
        {id:3,titulo:'nota 3',conteudo:'nota 1',autor:'marcelo'},
      ]
      return notasDatabase
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}