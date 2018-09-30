import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {$axios} from "./utils/index"
import store from "./store"

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = $axios;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
