import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://capsula-do-tempo.vercel.app',
})
