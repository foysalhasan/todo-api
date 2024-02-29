// api/index.js
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

module.exports = (req, res) => {
  server(req, res, (result) => {
    if (result instanceof Error) {
      return res.status(500).json({ message: result.message })
    }
  })
}
