import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 5 * 60 * 1000,
  exclude: { query: false },
  key: req => {
    let serialized = req.params instanceof URLSearchParams ?
      req.params.toString() : JSON.stringify(req.params) || ''
    return req.url + serialized
  }
})

const createAxios = (options = {}) => {
  return axios.create({
    adapter: cache.adapter,
    ...options,
  })
}

export {
  createAxios,
}