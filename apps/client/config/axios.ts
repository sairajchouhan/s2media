import axiosMain from 'axios'

const temp_env = 'production'

export const SERVER_BASE_URL =
  process.env.NODE_ENV === temp_env ? 'https://s2m-api.sairaj.me' : 'http://localhost:5000'

export const SERVER_URL =
  process.env.NODE_ENV === temp_env
    ? 'https://s2m-api.sairaj.me/api/v1'
    : 'http://localhost:5000/api/v1'

export const SEARCH_URL =
  process.env.NODE_ENV === temp_env
    ? `https://s2m-api.sairaj.me/back/search`
    : 'http://localhost:5000/back/search'

export const axios = axiosMain.create({
  baseURL: SERVER_URL,
})

console.log(SERVER_URL, SERVER_BASE_URL, SEARCH_URL)
