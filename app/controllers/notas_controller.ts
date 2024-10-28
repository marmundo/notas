// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

interface Nota {
  id: number
  titulo: string
  descricao: string
  usuario: string | number
}

interface Usuario {
  id: number
  nome: string
}

let usuariosDatabase: Usuario[] = [
  {
    id: 1,
    nome: 'Usuário 1',
  },
  {
    id: 2,
    nome: 'Usuário 2',
  },
]

let notasDatabase: Nota[] = [
  {
    id: 1,
    titulo: 'Nota 1',
    descricao: 'Descrição da nota 1',
    usuario: 1,
  },
  {
    id: 2,
    titulo: 'Nota 2',
    descricao: 'Descrição da nota 2',
    usuario: 2,
  },
]

/**
 * Retorna um array de notas com o nome do usuário correspondente.
 *
 * @param notas - O array de notas a serem processadas.
 * @returns Um novo array de notas com o nome do usuário correspondente.
 */
function getNotasComNomeUsuario(notas: Nota[]): Nota[] {
  console.log('getNotasComNomeUsuario')
  let notasComUsuario = notas.map((nota: Nota) => {
    const usuarioEncontrado = usuariosDatabase.find((usuario) => usuario.id === nota.usuario)
    return {
      ...nota,
      usuario: usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado',
    }
  })
  return notasComUsuario
}
/**
 * Função que encontra uma nota pelo seu ID.
 *
 * @param id O ID da nota a ser encontrada.
 * @returns O índice da nota no array de notas ou a string 'Nota não encontrada'.
 */
function encontraNotaPorID(id: number): number | string {
  const notaIndex = notasDatabase.findIndex((nota) => nota.id === id)
  if (notaIndex === -1) {
    return 'Nota não encontrada'
  }
  return notaIndex
}

export default class NotasController {
  /**
   * Retorna todas as notas com o nome do usuário.
   *
   * @returns Uma Promise que resolve com as notas contendo o nome do usuário.
   */
  async index({}: HttpContext) {
    return getNotasComNomeUsuario(notasDatabase)
  }

  /**
   * Retorna uma nota com base nos parâmetros fornecidos.
   *
   * @param request - O objeto de requisição HTTP.
   * @param params - Os parâmetros da rota.
   * @returns A nota correspondente aos parâmetros fornecidos.
   */
  async show({ request, params }: HttpContext) {
    if (params.id) {
      const id = Number.parseInt(params.id)
      return notasDatabase.find((nota) => nota.id === id)
    }
    const { titulo, descricao } = request.qs()
    if (titulo && descricao) {
      let notasFiltradas = notasDatabase.filter(
        (nota) => nota.titulo.includes(titulo) && nota.descricao.includes(descricao)
      )
      return getNotasComNomeUsuario(notasFiltradas)
    } else if (titulo) {
      return getNotasComNomeUsuario(notasDatabase.filter((nota) => nota.titulo.includes(titulo)))
    } else if (descricao) {
      return getNotasComNomeUsuario(
        notasDatabase.filter((nota) => nota.descricao.includes(descricao))
      )
    } else {
      return getNotasComNomeUsuario(notasDatabase)
    }
  }
  /**
   * Cria uma nova nota.
   *
   * @param request - O objeto de requisição contendo os dados da nota.
   * @returns A nova nota criada.
   */
  async store({ request }: HttpContext) {
    const { titulo, descricao, usuario } = request.body()
    const newNota: Nota = {
      id: notasDatabase.length + 1,
      titulo,
      descricao,
      usuario,
    }
    notasDatabase.push(newNota)
    return newNota
  }

  /**
   * Edita uma nota existente.
   *
   * @param {HttpContext} context - O contexto HTTP da requisição.
   * @returns {Promise<Nota | string>} - Uma promessa que resolve em uma nota atualizada ou uma string de erro.
   */
  async update({ request, params }: HttpContext) {
    const id = Number.parseInt(params.id)
    const { titulo, descricao, usuario } = request.body()

    const updatedNota: Nota = {
      id,
      titulo,
      descricao,
      usuario,
    }

    const notaIndex = encontraNotaPorID(id)
    if (typeof notaIndex === 'string') {
      return notaIndex
    }
    notasDatabase[notaIndex] = { ...notasDatabase[notaIndex], ...request.body() }

    return updatedNota
  }

  /**
   * Método assíncrono para excluir uma nota.
   *
   * @param params - Os parâmetros da requisição HTTP.
   * @returns A nota excluída.
   */
  async destroy({ params }: HttpContext) {
    const id = Number.parseInt(params.id)

    const notaIndex = encontraNotaPorID(id)
    if (typeof notaIndex === 'string') {
      return notaIndex
    }

    const deletedNota = notasDatabase.splice(notaIndex, 1)[0]

    return deletedNota
  }
}
