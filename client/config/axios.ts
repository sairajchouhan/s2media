import axiosMain from 'axios'
// create axios with config
export const axios = axiosMain.create({
  baseURL: 'http://localhost:5000/api/v1',
})
