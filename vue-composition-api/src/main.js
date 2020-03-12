import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/main.scss'
import 'nprogress/nprogress.css'
import axios from './utils/axios'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

async function startUp() {
  axios.interceptors.response.use(
    response => response, // simply return the response if OK
    error => {
      console.log(error)
      if (error.response.status === 401) {
        // if we catch a 401 error => session expired for example
        this.$store.dispatch('user/logout') // force a log out
        this.$router.push({ name: 'landing' })
      }
      return Promise.reject(error) // reject the Promise, with the error as the reason
    }
  )
  const userData = localStorage.getItem('user')
  if (userData) {
    store.commit('user/SET_USER', JSON.parse(userData))
    await store.dispatch('user/scheduleRefreshToken')
  }
}

startUp().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
