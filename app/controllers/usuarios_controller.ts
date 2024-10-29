import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class UsuariosController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await Usuario.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { nome } = request.body()
    const usuarios = await Usuario.all()
    let nUsuarios = usuarios.length
    const novoUsuario = {
      id: nUsuarios + 1,
      nome,
    }
    await Usuario.create(novoUsuario)
    return novoUsuario
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    const usuarioEncontrado = await Usuario.find(id)
    return usuarioEncontrado || 'Usuário não encontrado'
  }

  /**
   * Edit individual record
   */
  async update({ request, params }: HttpContext) {
    const { id } = params
    const { nome } = request.body()
    const usuarioEncontrado = await Usuario.find(id)
    if (!usuarioEncontrado) {
      return 'Usuário não encontrado'
    }
    usuarioEncontrado.merge({ nome })
    await usuarioEncontrado.save()
    return usuarioEncontrado
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params
    const usuario = await Usuario.find(id)
    if (!usuario) {
      return 'Usuário não encontrado'
    }
    await usuario.delete()
    return usuario
  }
}
