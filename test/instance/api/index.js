// Connecter core
import Connecter from '@mcswift/connecter'
// app env
import env from '@/.env'
// modules
import common from './modules/common'
import user from './modules/user'
import certified from './modules/certified'
import adopts from './modules/adopt'

// vuex instance
import store from '@/store/index.js'
console.log(env)
const apiConfig = {
  modules: {
    user,
    common,
    certified,
    adopts
  },
  baseURL: env.baseURL,
  vuePluginName: '$api',
  hooks: {
    successEach: res => res.data,
    failEach: e => {
      if (e.message === 'timeout of 10000ms exceeded') {
        store.dispatch('GlobalMessage', {
          type: 'error',
          message: '请求超时'
        })
        return
      }
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log('Res data', e.response.data)
        // console.log('Res code', e.response.status) // http code
        const s = e.response.status * 1
        if (s === 401) {
          store.dispatch('LogOut')
        }
        // console.log('Res header', e.response.headers)
      } else if (e.request) {
        if (e.message === 'Network Error') {
          store.dispatch('LogOut')
        }
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(e.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', e.message)
      }
      // console.log(e.config)
    }
  },
  token: {
    getter: () => store.getters.api_token,
    key: 'api_token'
  }
}

let api = new Connecter(apiConfig)
api._axios.defaults.headers = { post: {} }
api._axios.defaults.headers.post['Accept'] = 'application/json'

export default api
