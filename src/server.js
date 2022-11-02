'use strict'

const Hapi = require('@hapi/hapi')
const consola = require('consola')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(routes)

  await server.start()
  consola.success(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  consola.BrowserReporter(new Error(err))
  process.exit(1)
})

init()
