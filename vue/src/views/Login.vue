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
import { mapActions } from 'vuex'
import NProgress from 'nprogress'

export default {
  name: 'Login.vue',
  components: { MyFieldButton, MyField },
  data() {
    return {
      email: '',
      password: '',
      loginFailed: false
    }
  },
  created() {
    if (this.$store.getters['user/isAuthenticated']) {
      this.$router.replace({ name: 'expenses_list' })
    }
  },
  methods: {
    doLogin() {
      this.loginFailed = false
      NProgress.start()
      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: 'expenses_list' })
          NProgress.done()
        })
        .catch(() => {
          this.loginFailed = true
          NProgress.done()
        })
    },
    ...mapActions('user', ['login'])
  }
}
</script>

<style scoped></style>
