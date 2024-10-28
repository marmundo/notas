import type { HttpContext } from '@adonisjs/core/http'
interface Usuario {
  id: number
  nome: string
}
export let usuariosDatabase: Usuario[] = [
  {
    id: 1,
    nome: 'Usuário 1',
  },
  {
    id: 2,
    nome: 'Usuário 2',
  },
]

export default class UsuariosController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return usuariosDatabase
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { nome } = request.body()
    const novoUsuario: Usuario = {
      id: usuariosDatabase.length + 1,
      nome,
    }
    usuariosDatabase.push(novoUsuario)
    return novoUsuario
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    const usuarioEncontrado = usuariosDatabase.find((usuario) => usuario.id === Number(id))
    return usuarioEncontrado ? usuarioEncontrado : 'Usuário não encontrado'
  }

  /**
   * Edit individual record
   */
  async update({ request, params }: HttpContext) {
    const { id } = params
    const { nome } = request.body()
    const usuarioEncontrado = usuariosDatabase.find((usuario) => usuario.id === Number(id))
    if (!usuarioEncontrado) {
      return 'Usuário não encontrado'
    }
    usuarioEncontrado.nome = nome
    return usuarioEncontrado
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const { id } = params
    const usuarioIndex = usuariosDatabase.findIndex((usuario) => usuario.id === Number(id))
    if (usuarioIndex === -1) {
      return 'Usuário não encontrado'
    }
    const usuarioRemovido = usuariosDatabase.splice(usuarioIndex, 1)
    return usuarioRemovido
  }
}
