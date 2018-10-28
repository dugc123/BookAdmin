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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.userinfo.username) { //判断store里面是否有内容
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
  /*如果本地 store里面是否有内容，则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {
    if (store.state.userinfo.username) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
