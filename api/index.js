const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('/db.json') // The path to your database file
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
server.use(router)

// Export your server instance directly
module.exports = server
