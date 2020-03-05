import store from '../store'
import NProgress from 'nprogress'

export default {
  async beforeRouteEnter(to, from, next) {
    try {
      NProgress.start()
      await store.dispatch('expenses/getCategories')
      await store.dispatch('expenses/getExpenses')
      NProgress.done()
      next()
    } catch (e) {
      console.log(e)
      NProgress.done()
      await store.dispatch('user/logout')
      next('/')
    }
  }
}
