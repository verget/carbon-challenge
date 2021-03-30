import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

const basicMapper = (result: AxiosResponse) => {
  if (result && result.data) {
    return Promise.resolve(result.data)
  }
  return Promise.reject(new Error('empty response'))
}
const requestHandler = async (request: AxiosRequestConfig) => {
  if (!request.headers['Content-Type']) {
    request.headers['Content-Type'] = 'application/json'
  }
  return request
}
axios.interceptors.request.use(requestHandler)

export const http = (
  options: AxiosRequestConfig,
  responseMapper = basicMapper
): Promise<AxiosPromise> => {
  const { url, method, data, headers, params, responseType, timeout } = options
  return axios
    .request({
      url,
      method,
      data,
      headers,
      params,
      responseType,
      timeout: timeout || 10000,
    })
    .then((result) => responseMapper(result))
}
