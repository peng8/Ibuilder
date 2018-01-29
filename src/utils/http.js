import axios from 'axios'
import queryString from "@/utils/queryString.js"
var instance = axios.create({
  timeout: 20000,
  baseURL: "http://10.0.33.21",
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    // "accessToken": "utry-968d47e2017611e8a416000c2907a862",
    //'accessToken': queryString("accessToken"),
  },
})

instance.interceptors.request.use(
  config => {
    config.headers.accessToken = queryString("accessToken")
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)


export default instance
