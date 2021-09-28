import axiosMain from 'axios'
// create axios with config
export const axios = axiosMain.create({
  baseURL: process.env.API_END_POINT ?? 'http://localhost:5000/api/v1',
})
