import { create as create_org } from 'axios'

const url = process.env.NODE_ENV === 'development' ?
  'http://localhost:8080' :
  'https://negaposi.crepemaker.xyz'

const create = (options) => create_org({
  baseURL: url,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  ...options
})

export { create }