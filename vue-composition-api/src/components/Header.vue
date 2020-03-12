<template>
  <header class="hero is-primary">
    <div class="hero-body has-text-centered">
      <div class="container">
        <h1 class="title">Household Expenses</h1>
        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link
              :to="{ name: 'expenses_add' }"
              class="has-text-white navbar-item"
              exact-active-class="is-active"
              >Add New Expense</router-link
            >
            <router-link
              :to="{ name: 'expenses_list' }"
              class="has-text-white navbar-item"
              exact-active-class="is-active"
              >Show Expenses</router-link
            >
            <router-link
              :to="{ name: 'expenses_sum' }"
              class="has-text-white navbar-item"
              exact-active-class="is-active"
              >Show Sum</router-link
            >
          </div>
          <div class="navbar-end">
            <a class="has-text-white" @click="doLogout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters('user', ['userName'])
  },
  methods: {
    doLogout() {
      this.logout()
      this.$router.push({ name: 'landing' })
    },
    ...mapActions('user', ['logout'])
  }
}
</script>
