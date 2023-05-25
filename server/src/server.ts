import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import staticLib from '@fastify/static'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'
import { env } from 'process'

export function init() {
  const app = Fastify({
    logger: false,
  })

  app.register(multipart)

  app.register(cors, {
    origin: true, // Todas as URLs (Front-Ends) permitidas (por enquanto)
  })

  app.register(jwt, {
    secret: `${env.SECRET}`,
  })

  app.register(memoriesRoutes)
  app.register(authRoutes)
  app.register(uploadRoutes)
  app.register(staticLib, {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads',
  })

  return app
}

// Execute the app when called directly( ex.: "npm run dev")
if (require.main === module) {
  init()
    .listen({
      port: 3333,
    })
    .then(() => {
      console.log('Running on port 3333')
    })
}
