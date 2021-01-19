// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   const authenticatedUser =
//     localStorage.getItem('token') && localStorage.getItem('user') ? true : false
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

//   if (requiresAuth && !authenticatedUser) next('login')
//   else next()
// })

sync(store, router)

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi' // default - only for display purposes
    }
  }),
  components: { App },
  template: '<App/>'
})
