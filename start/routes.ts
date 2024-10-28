/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

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
router.get('/', async () => {
  return getNotasComNomeUsuario(notasDatabase)
})

function getNotasComNomeUsuario(notas: Nota[]): Nota[] {
  let notasComUsuario = notas.map((nota: Nota) => {
    const usuarioEncontrado = usuariosDatabase.find((usuario) => usuario.id === nota.usuario)
    return {
      ...nota,
      usuario: usuarioEncontrado ? usuarioEncontrado.nome : 'Usuário não encontrado',
    }
  })
  return notasComUsuario
}

function encontraNotaPorID(id: number): number | string {
  const notaIndex = notasDatabase.findIndex((nota) => nota.id === id)
  if (notaIndex === -1) {
    return 'Nota não encontrada'
  }
  return notaIndex
}

router.get('/notas/:id?', async ({ request, params }) => {
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
})

router.post('/notas', async ({ request }) => {
  const { titulo, descricao, usuario } = request.body()
  const newNota: Nota = {
    id: notasDatabase.length + 1,
    titulo,
    descricao,
    usuario,
  }
  notasDatabase.push(newNota)
  return newNota
})
router.put('/notas/:id', async ({ request, params }) => {
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
})

router.delete('/notas/:id', async ({ params }) => {
  const id = Number.parseInt(params.id)

  const notaIndex = encontraNotaPorID(id)
  if (typeof notaIndex === 'string') {
    return notaIndex
  }

  const deletedNota = notasDatabase.splice(notaIndex, 1)[0]

  return deletedNota
})
