/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    marcelo: 'goat',
  }
})

let notasDatabase=[
  {id:1,titulo:'nota 1',conteudo:'nota 1',autor:'marcelo'},
  {id:2,titulo:'nota 2',conteudo:'nota 1',autor:'marcelo'},
  {id:3,titulo:'nota 3',conteudo:'nota 1',autor:'marcelo'},
]

router.get('/notas',async({request})=>{
  const id = request.input('id') 
  if(id)
    return notasDatabase.find(nota => nota.id == id)
  return notasDatabase
})
// rota com query string
router.get('/notas/:id',async({params})=>{
  return notasDatabase.find(nota=>nota.id==params.id)})

router.post('/notas',async({request,response})=>{
  //body={titulo:'nota 4',conteudo:'nota 4',autor:'marcelo'}
  const nota=request.body()
  nota.id=notasDatabase.length+1
  notasDatabase.push(nota)
  response.status(201)
  return nota
})

