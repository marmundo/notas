/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

let notasDatabase = {
  notas: [
    {
      id: 1,
      titulo: 'Nota 1',
      descricao: 'Descrição da nota 1',
    },
    {
      id: 2,
      titulo: 'Nota 2',
      descricao: 'Descrição da nota 2',
    },
  ],
}
router.get('/', async () => {
  return notasDatabase.notas
})

router.get('/notas', async ({ request }) => {
  const { titulo, descricao } = request.qs()
  if (titulo && descricao) {
    return notasDatabase.notas.filter(
      (nota) => nota.titulo.includes(titulo) && nota.descricao.includes(descricao)
    )
  } else if (titulo) {
    return notasDatabase.notas.filter((nota) => nota.titulo.includes(titulo))
  } else if (descricao) {
    return notasDatabase.notas.filter((nota) => nota.descricao.includes(descricao))
  } else {
    return notasDatabase.notas
  }
})

router.get('/:id', async ({ params }) => {
  const id = Number.parseInt(params.id)
  return notasDatabase.notas.find((nota) => nota.id === id)
})
