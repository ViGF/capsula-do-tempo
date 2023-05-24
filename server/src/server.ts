import { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import staticLib from '@fastify/static'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'
import { env } from 'process'

export default async function (app: FastifyInstance) {
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
}
