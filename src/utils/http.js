import axios from 'axios'
var instance = axios.create({
  timeout: 20000,
  baseURL: "http://10.0.33.21",
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    "accessToken": "utry-d0b77d3200d511e8a9d4000c2907a862",
  },
})

instance.interceptors.request.use(
  config => {
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
