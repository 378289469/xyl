import axios from 'axios'

const URL_BASE = 'http://127.0.0.1:8082/jeecg-boot/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODkxNDkwMTEsInVzZXJuYW1lIjoiMTM3NTMxNjcwNjU6emJsIn0.E_p7gqRxhHwITU4uWPlpvF_hoPR8mdG8iNtXpTwzanA'
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
  url = URL_BASE + url
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
