import axios from 'axios'

axios.interceptors.request.use(
  config => {
    return config
  }
)

axios.interceptors.response.use(
  response => {
    return response
  }
)

const URL_BASE = 'http://192.168.1.5:8085/jeecg-boot/'

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

    // promise.then(function(response){
    //     resolve(response.data)
    // }).catch(function(error){
    //     reject(error)
    // })
  })
}
