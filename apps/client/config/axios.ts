import axiosMain from 'axios'

export const SERVER_BASE_URL =
  process.env.NODE_ENV === 'production' ? 'http://localhost:80' : 'http://localhost:5001'

export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:80/api/v1'
    : 'http://localhost:5001/api/v1'

export const SEARCH_URL =
  process.env.NODE_ENV === 'production'
    ? `http://localhost:80/back/search`
    : 'http://localhost:5001/back/search'

export const axios = axiosMain.create({
  baseURL: SERVER_URL,
})

console.log(SERVER_URL, SERVER_BASE_URL, SEARCH_URL)
