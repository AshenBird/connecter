// core
import Vue from 'vue'

// root component
import App from './App'

import api from './api/index'
Vue.use(api)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
