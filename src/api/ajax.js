import axios from 'axios'
export default function ajax (url, data={}, type='GET'){
    type = tpye.toUpperCase()
    return new Promise (function(resolve, reject){
        let promise
        if(type === 'GET'){
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '='+ data[key] + '&'
            })
            if(dataStr !== ''){
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            promise = axios.get(url)
        }else if(type === 'POST'){
            promise = axios.post(url, data)
        }else if(type === 'PUT'){
            promise = axios.put(url, data)
        }
        promise.then(({data}) => resolve).catch(error => reject)

        // promise.then(function(response){
        //     resolve(response.data)
        // }).catch(function(error){
        //     reject(error)
        // })
    })
}