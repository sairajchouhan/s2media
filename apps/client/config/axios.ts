import axiosMain from 'axios'

const temp_env = 'production'

export const SERVER_BASE_URL =
  process.env.NODE_ENV === temp_env ? 'https://s2m-api.sairaj.me' : 'http://localhost:5000'

export const SERVER_URL =
  process.env.NODE_ENV === temp_env ? `${SERVER_BASE_URL}/api/v1` : `${SERVER_BASE_URL}/api/v1`

export const SOCKET_URL =
  process.env.NODE_ENV === temp_env
    ? `https://s2m-api.sairaj.me/back/search`
    : 'http://localhost:8080/back/search'

export const axios = axiosMain.create({
  baseURL: SERVER_URL,
})
