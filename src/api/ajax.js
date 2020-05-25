import axios from 'axios'
import store from '../store/index'
import modules from '../store/modules'

export const baseUrl = 'http://192.168.1.2:8082/jeecg-boot/'
const token1 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTA0Nzk5NzYsInVzZXJuYW1lIjoiMTM3NTMxNjcwNjU6emJsIn0.W_yHHiHcRkZV2xmIWrTjzaO0iLOpuG27bavWb4xYgD8'
export const userId = '1260818088405553153'

axios.interceptors.request.use(
  config => {
    config.headers['X-Access-Token'] = store.state.userInfo.result ? store.state.userInfo.result.token : token1
    return config
  }
)
axios.interceptors.response.use(
  response => {
    if (response.data.code === 0 || response.data.code === 500) {
      modules.actions.tipMsg({ commit: store.commit }, { type: 5, msg: response.data.message })
    }
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
