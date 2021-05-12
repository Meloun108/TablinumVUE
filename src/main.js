import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VueToastr from "vue-toastr";


Vue.use(VueAxios, axios)
Vue.use(VueToastr);
Vue.use(Vuex)
Vue.config.productionTip = false
//Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')