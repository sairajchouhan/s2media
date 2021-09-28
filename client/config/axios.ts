import axiosMain from 'axios'
// create axios with config
export const axios = axiosMain.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT ?? 'http://localhost:5000/api/v1',
})
