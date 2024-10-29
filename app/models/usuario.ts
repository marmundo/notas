import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

/*
- Instalação do Lucid ORM: node ace add @adonisjs/lucid
- Criação do model Usuario: node ace make:model Usuario
- Criação da tabela usuarios: node ace make:migration usuarios
- Execução das migrations: node ace migration:run
*/
export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
