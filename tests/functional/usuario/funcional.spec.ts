import { test } from '@japa/runner'

const BASE_URL = 'http://localhost:3333'

test.group('Usuario', () => {
  test('criacao usuario', async ({ client }) => {
    const response = await client.post(`${BASE_URL}/usuarios`).json({ nome: 'Fulano' })
    response.assertStatus(200)
    response.assertBodyContains({ nome: 'Fulano' })
    let id = response.body().id
    await client.delete(`${BASE_URL}/usuarios/${id}`)
  })

  test('listagem de usuarios', async ({ client, assert }) => {
    const response = await client.get(`${BASE_URL}/usuarios`)
    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('exibicao de usuario', async ({ client }) => {
    const response = await client.get(`${BASE_URL}/usuarios/1`)
    response.assertStatus(200)
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
})
