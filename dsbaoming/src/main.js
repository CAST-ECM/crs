// import vue from 'vue';
import App from './App'

import router from './router'
import md5 from 'js-md5'
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$url = 'http://127.0.0.1:4000';


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


