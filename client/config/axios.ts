import axios from 'axios'
// create axios with config
const axiosInstance = axios.create({
  baseURL: process.env.API_END_POINT,
})
export default axiosInstance
