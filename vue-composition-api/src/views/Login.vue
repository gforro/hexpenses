<template>
  <div class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-desktop">
            <form class="box" @submit.prevent="doLogin">
              <my-field
                label="Email"
                type="email"
                placeholder="e.g. week4@vue360.com"
                v-model="email"
              />
              <my-field label="Password" type="password" v-model="password" />
              <div class="is-clearfix">
                <div class="is-pulled-right">
                  <my-field-button text="Login"></my-field-button>
                </div>
                <span
                  v-if="loginFailed"
                  class="has-text-danger has-text-centered is-pulled-left"
                  >Login failed. Try again.</span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyField from '../components/MyField'
import MyFieldButton from '../components/MyFieldButton'
import NProgress from 'nprogress'
import { dispatchLogin, getIsAuthenticated } from '../store/user'
import { reactive, toRefs } from '@vue/composition-api'

export default {
  name: 'Login.vue',
  components: { MyFieldButton, MyField },
  setup(_, { root: { $router, $store } }) {
    if (getIsAuthenticated($store)) {
      $router.replace({ name: 'expenses_list' })
    }
    const data = reactive({
      email: '',
      password: '',
      loginFailed: false
    })
    const doLogin = () => {
      data.loginFailed = false
      NProgress.start()
      dispatchLogin($store, data.email, data.password)
        .then(() => {
          $router.push({ name: 'expenses_add' })
        })
        .catch(() => (data.loginFailed = true))
        .finally(() => {
          NProgress.done()
        })
    }
    return {
      ...toRefs(data),
      doLogin
    }
  }
}
</script>

<style scoped></style>
