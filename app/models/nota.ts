import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

/*
- Instalação do Lucid ORM: node ace add @adonisjs/lucid
- Criação do model Nota: node ace make:model nota
- Criação da tabela notas: node ace make:migration nota
- Execução das migrations: node ace migration:run
*/

export default class Nota extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare descricao: string

  @column()
  declare usuario: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
