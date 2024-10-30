// import type { HttpContext } from '@adonisjs/core/http'

import Nota from '#models/nota'
import Usuario from '#models/usuario'
import { HttpContext } from '@adonisjs/core/http'

/**
 * Retorna um array de notas com o nome do usuário correspondente.
 *
 * @param notas - O array de notas a serem processadas.
 * @returns Um novo array de notas com o nome do usuário correspondente.
 */
function getNotasComNomeUsuario(notas: Nota[]) {
  let notasComUsuario = notas.map(async (nota: Nota) => {
    const usuarioEncontrado = await Usuario.find(nota.usuario)
    return {
      ...nota,
      usuario: usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado',
    }
  })

  return notasComUsuario
}

export default class NotasController {
  /**
   * Retorna todas as notas com o nome do usuário.
   *
   * @returns Uma Promise que resolve com as notas contendo o nome do usuário.
   */
  async index() {
    return await Nota.all()
  }

  /**
   * Retorna uma nota com base nos parâmetros fornecidos.
   *
   * @param request - O objeto de requisição HTTP.
   * @param params - Os parâmetros da rota.
   * @returns A nota correspondente aos parâmetros fornecidos.
   */
  async show({ request, response, params }: HttpContext) {
    if (params.id) {
      const id = Number.parseInt(params.id)
      return await Nota.find(id)
    }
    const { titulo, descricao } = request.qs()
    if (titulo && descricao) {
      let notasFiltradas = await Nota.findManyBy({ titulo, descricao })
      return getNotasComNomeUsuario(notasFiltradas)
    } else if (titulo) {
      const notasEncontradas: Nota[] = (await Nota.findManyBy('titulo', titulo)) || []
      if (notasEncontradas.length === 0) {
        return response.status(404).send('Nota não encontrada')
      }
      return getNotasComNomeUsuario(notasEncontradas)
    } else if (descricao) {
      const notasEncontradas: Nota[] = (await Nota.findManyBy('descricao', descricao)) || []
      if (notasEncontradas.length === 0) {
        return response.status(404).send('Nota não encontrada')
      }
      return getNotasComNomeUsuario(notasEncontradas)
    } else {
      return getNotasComNomeUsuario(await Nota.all())
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
    const notas = await Nota.all()

    const newNota = {
      id: notas.length + 1,
      titulo,
      descricao,
      usuario,
    }
    await Nota.create(newNota)
    return newNota
  }

  /**
   * Edita uma nota existente.
   *
   * @param {HttpContext} context - O contexto HTTP da requisição.
   * @returns {Promise<Nota | string>} - Uma promessa que resolve em uma nota atualizada ou uma string de erro.
   */
  async update({ request, params, response }: HttpContext) {
    const id = Number.parseInt(params.id)
    const { titulo, descricao, usuario } = request.body()

    const notaEncontrada = await Nota.find(id)

    if (!notaEncontrada) {
      return response.status(404).send('Nota não encontrada')
    }

    const updatedNota = {
      ...notaEncontrada,
      titulo,
      descricao,
      usuario,
    }

    notaEncontrada.merge(updatedNota)
    await notaEncontrada.save()
    return updatedNota
  }

  /**
   * Método assíncrono para excluir uma nota.
   *
   * @param params - Os parâmetros da requisição HTTP.
   * @returns A nota excluída.
   */
  async destroy({ params, response }: HttpContext) {
    const id = Number.parseInt(params.id)

    const nota = await Nota.find(id)
    if (!nota) {
      return response.status(404).send('Nota não encontrada')
    }
    await nota.delete()
    return nota
  }
}
