import axios from 'axios'
import store from '../store/index'
import modules from '../store/modules'

export const baseUrl = 'http://192.168.5.56:8082/jeecg-boot/'
let token = ''

axios.interceptors.request.use(
  config => {
    console.log(token)
    config.headers['X-Access-Token'] = token && token
    return config
  }
)
axios.interceptors.response.use(
  response => {
    if (response.data.code === 0 || response.data.code === 500) {
      modules.actions.tipMsg(
        { commit: store.commit },
        { tips: { type: 5, msg: response.data.message } }
      )
    }
    return response
  }
)

export const ajax = (url, data = {}, type = 'GET') => {
  type = type.toUpperCase()
  url = baseUrl + url
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'CHECK') {
      token = data.result.token
      promise = axios.post(url)
    }
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
