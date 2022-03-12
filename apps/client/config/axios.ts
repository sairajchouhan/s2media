import axiosMain from 'axios'

export const SERVER_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}`
    : 'http://localhost:5000'

export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
    : 'http://localhost:5000/api/v1'

export const SEARCH_URL =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/back/search`
    : 'http://localhost:5000/back/search'

export const axios = axiosMain.create({
  baseURL: SERVER_URL,
})
