<template>
  <div>
    <app-header></app-header>
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'AuthorizedApp',
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch('expenses/getCategories')
  }
}
</script>

<style scoped></style>
