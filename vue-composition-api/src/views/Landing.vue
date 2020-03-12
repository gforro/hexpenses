<template>
  <div class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="title is-4">
          Simple application to register expenses in your household.
        </div>
        <router-link to="/login">Click here to start</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getIsAuthenticated } from '../store/user'

export default {
  name: 'Landing',
  setup(_, { root: { $router, $store } }) {
    if (getIsAuthenticated($store)) {
      $router.replace({ name: 'expenses_list' })
    }
  }
}
</script>
