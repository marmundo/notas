/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// Importa o controller NotasController usando lazy loading
// https://docs.adonisjs.com/guides/controllers/lazy-loading
/*
Importar o controller como lazy loading é uma técnica utilizada para melhorar o desempenho e a eficiência do carregamento do código em uma aplicação.

Quando você importa um módulo usando o lazy loading, o código desse módulo só é carregado quando é realmente necessário, em vez de ser carregado imediatamente durante a inicialização da aplicação. Isso é especialmente útil quando você tem módulos grandes ou complexos que podem não ser necessários em todas as partes da aplicação.
*/
const NotasController = () => import('#controllers/notas_controller')
import router from '@adonisjs/core/services/router'

// Resource criado para o controller NotasController utilizando o comando
// node ace make:controller posts--resource
router.resource('notas', NotasController)
