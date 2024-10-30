import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

const BASE_URL = 'http://localhost:3333'

test.group('Usuario', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('criacao usuario', async ({ client }) => {
    const response = await client.post(`${BASE_URL}/usuarios`).json({ nome: 'Fulano' })
    let id = response.body().id
    response.assertStatus(200)
    response.assertBodyContains({ nome: 'Fulano' })
    await client.delete(`${BASE_URL}/usuarios/${id}`)
  })

  test('listagem de usuarios', async ({ client, assert }) => {
    const response = await client.get(`${BASE_URL}/usuarios`)
    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('exibicao de usuario', async ({ client }) => {
    let responsePost = await client.post(`${BASE_URL}/usuarios`).json({ nome: 'Fulano' })
    let id = responsePost.body().id
    const response = await client.get(`${BASE_URL}/usuarios/${id}`)
    response.assertStatus(200)
    await client.delete(`${BASE_URL}/usuarios/${id}`)
  })

  test('atualizacao de usuario', async ({ client }) => {
    let responsePost = await client.post(`${BASE_URL}/usuarios`).json({ nome: 'Fulano' })
    let id = responsePost.body().id
    let response = await client.put(`${BASE_URL}/usuarios/${id}`).json({ nome: 'Ciclano' })
    response.assertStatus(200)
    response.assertBodyContains({ nome: 'Ciclano' })
    await client.delete(`${BASE_URL}/usuarios/${id}`)
  })

  test('delecao de usuario', async ({ client }) => {
    let responsePost = await client.post(`${BASE_URL}/usuarios`).json({ nome: 'Fulano' })
    let id = responsePost.body().id
    const response = await client.delete(`${BASE_URL}/usuarios/${id}`)
    response.assertStatus(200)
    response.assertBodyContains({ id: id })
  })

  test('delecao de usuario inexistente', async ({ client }) => {
    let response = await client.delete(`${BASE_URL}/usuarios/1`)
    response.assertStatus(404)
  })
})
