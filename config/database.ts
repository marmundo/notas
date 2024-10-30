import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'
const isTest = process.env.NODE_ENV === 'test'

const connection = isTest ? 'test' : 'production'

const dbConfig = defineConfig({
  connection,
  connections: {
    production: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    test: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('testdb.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})
const testDbConfig = defineConfig({
  connection: 'sqlite',
  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('test_db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

dbConfig.connections['test'] = testDbConfig.connections.sqlite

export default dbConfig
