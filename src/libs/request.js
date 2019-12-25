import axios from 'axios'
// import store from '@/store'
import Qs from 'qs'
import router from '@/router'
// import { setToken } from './util'
import config from '../../config'
const baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}
var isOnlineError = false

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        // token: getToken()
        // token: 'E795011AC8534A8E9EF8D2C35D368545'
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    // 请求拦截,instance是axios实例
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      // -- 根据返回的数据进行判断【不同项目返回的数据结构不同，这里代码需与服务器配合写】
      if(res.status===200){
        return res.data
      }else{
        alert(res.msg)
        return Promise.reject(new Error('出错啦'))
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      // -- 请求超时
      if (!isOnlineError) {
        isOnlineError = true
        alert('未连接到服务器')
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    // -- 如果是multipart文件上传，搭配FormData数据上传文件，则不需要Qs解析字符串
    if (options.headers && options.headers['Content-Type'] === 'multipart/form-data') {
    } else if (options.data) {
      debugger
      // -- 因为后台Java requestParam这个是只能从请求的地址中取出参数，
      // 也就是只能从username=admin&password=admin这种字符串中解析出参数。
      options.data = Qs.stringify(options.data)
    }
    // -- 拷贝数据，引用的话只拷贝引用
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export const getRequest = (url, params) => {
    // let header = { token: getToken() }
    return new HttpRequest(baseURL).request({
      method: 'get',
      url: url,
      params: params,
    //   headers: header
    })
  }
  /**
   * post请求
   * @param url
   * @param params
   * @returns {*|void|ClientRequest|never|AxiosPromise<any>|ClientHttp2Stream}
   */
  export const postRequest = (url, params, header) => {
    // let headers = header ? header : { token: getToken() }
    return new HttpRequest(baseURL).request({
      method: 'post',
      url: url,
      data: params,
    //   headers: headers
    })
  }
