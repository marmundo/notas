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

router.get('/notas', async ({ request }) => {
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

router.get('/:id', async ({ params }) => {
  const id = Number.parseInt(params.id)
  return notasDatabase.find((nota) => nota.id === id)
})
