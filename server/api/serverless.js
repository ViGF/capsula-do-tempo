// Read the .env file.
import * as dotenv from 'dotenv'

// Require the framework
import { init } from '../src/server'
dotenv.config()

export default async (req, res) => {
  const app = init()
  await app.ready()
  app.server.emit('request', req, res)
}
