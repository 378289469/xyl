import axios from 'axios'
import store from '../store/index'

export const baseUrl = 'http://192.168.5.56:8082/jeecg-boot/'

axios.interceptors.request.use(
  config => {
    if (store.state.userInfo.token) {
      config.headers['X-Access-Token'] = store.state.userInfo.token
    }
    return config
  }
)

axios.interceptors.response.use(
  response => {
    return response
  }
)

export const ajax = (url, data = {}, type = 'GET') => {
  type = type.toUpperCase()
  url = baseUrl + url
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    } else if (type === 'POST') {
      promise = axios.post(url, data)
    } else if (type === 'PUT') {
      promise = axios.put(url, data)
    }
    promise.then(({ data }) => resolve(data)).catch(error => reject(error))
  })
}
