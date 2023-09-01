import axios from 'axios'
import hyRequest from '..'

export function watchPodLogRequest(url: string, params = {}, callback: any) {
  const xhr = new XMLHttpRequest()
  const logURL =
    'http://127.0.0.1:8081/ekube/api/v1/proxy/namespaces/default/pods/nginx-54bcfc567b-6dr5l/log?tailLines=100&timestamps=true&follow=true'

  xhr.open('GET', logURL, true)

  xhr.onreadystatechange = () => {
    if (xhr.readyState >= 3 && xhr.status === 200) {
      callback(xhr.responseText)
    }
  }

  xhr.send()

  return xhr
}

export function getPodLogRequest(params = {}) {
  return axios.get(
    'http://127.0.0.1:8081/ekube/api/v1/proxy/namespaces/default/pods/nginx-54bcfc567b-6dr5l/log?tailLines=100&timestamps=true&follow=false',
    params
  )

  // return hyRequest.get<any>({
  //   url: `/keyauth/api/v1/menu`,
  //   params: params
  // })
}
