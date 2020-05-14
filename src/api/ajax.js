import axios from 'axios'
import main from './main'

const token = main.token
const baseUrl = main.baseUrl

axios.interceptors.request.use(
  config => {
    config.headers['X-Access-Token'] = token
    return config
  }
)

axios.interceptors.response.use(
  response => {
    return response
  }
)

export default function ajax (url, data = {}, type = 'GET') {
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
