import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/main.scss'
import 'nprogress/nprogress.css'
import axios from './utils/axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    axios.interceptors.response.use(
      response => response, // simply return the response if OK
      error => {
        console.log(error)
        console.log(error.response)
        console.log(error.response.status)
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
      console.log(userData)
      console.log(JSON.parse(userData))
      store.commit('user/SET_USER', JSON.parse(userData))
    }
  },
  render: h => h(App)
}).$mount('#app')
