import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

const BASE_URL = 'http://localhost:3333'

test.group('Nota', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('criacao nota', async ({ client }) => {
    const response = await client
      .post(`${BASE_URL}/notas`)
      .json({ titulo: 'Nota', descricao: 'Nota' })
    response.assertStatus(200)
    response.assertBodyContains({ titulo: 'Nota' })
    let id = response.body().id
    await client.delete(`${BASE_URL}/notas/${id}`)
  })

  test('listagem de notas', async ({ client, assert }) => {
    const response = await client.get(`${BASE_URL}/notas`)
    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('exibicao de nota', async ({ client }) => {
    let response = await client
      .post(`${BASE_URL}/notas`)
      .json({ titulo: 'Nota', descricao: 'Nota' })
    let id = response.body().id

    response = await client.get(`${BASE_URL}/notas/${id}`)
    response.assertStatus(200)
  })

  test('atualizacao de nota', async ({ client }) => {
    const responsePost = await client
      .post(`${BASE_URL}/notas`)
      .json({ titulo: 'Nota', descricao: 'Nota' })
    let id = responsePost.body().id

    let response = await client.put(`${BASE_URL}/notas/${id}`).json({ titulo: 'Nota Editada' })
    response.assertStatus(200)
    response.assertBodyContains({ titulo: 'Nota Editada' })
    await client.delete(`${BASE_URL}/notas/${id}`)
  })

  test('delecao de nota', async ({ client }) => {
    const responsePost = await client
      .post(`${BASE_URL}/notas`)
      .json({ titulo: 'Nota', descricao: 'Nota' })
    let id = responsePost.body().id
    const response = await client.delete(`${BASE_URL}/notas/${id}`)
    response.assertStatus(200)
    response.assertBodyContains({ id: id })
  })
})
