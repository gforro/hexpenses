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
export default {
  name: 'Landing',
  created() {
    console.log('landing created')
    console.log(this.$store.getters['user/isAuthenticated'])
    if (this.$store.getters['user/isAuthenticated']) {
      this.$router.replace({ name: 'expenses_list' })
    }
  }
}
</script>
