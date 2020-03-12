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
import {dispatchGetCategories} from '../store/categories';
export default {
  name: 'AuthorizedApp',
  components: {
    appHeader: Header
  },
  setup(_, {root: {$store}}) {
    dispatchGetCategories($store)
  }
}
</script>

<style scoped></style>
