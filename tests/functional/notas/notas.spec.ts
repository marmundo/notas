import { test } from '@japa/runner'

test.group('Notas notas', () => {
  test('deveria acessar o google com sucesso', async ({ client }) => {
    const resposta=await client.get('https://www.google.com')
    resposta.assertStatus(200)
    // resposta.dump()
  })

  test('deveria listar todas as notas', async ({ client }) => {
    const resposta=await client.get('/notas')
    resposta.assertStatus(200)
  })

  test('deveria dar erro se a rota nao existe', async ({ client }) => {
    const resposta=await client.get('/pedroDavi')
    resposta.assertStatus(404)
  })

  test('deveria criar uma nova nota', async ({ client }) => {
    
  })
})