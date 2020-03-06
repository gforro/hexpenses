<template>
  <div class="container">
    <h1 class="title is-2">Summary</h1>
    <table class="table is-fullwidth">
      <thead>
        <th>Category</th>
        <th>Total ($)</th>
      </thead>
      <tbody>
        <tr v-for="s in sums" :key="s.id">
          <td>{{ s.text }}</td>
          <td>{{ s.expenses }} $</td>
        </tr>
      </tbody>
    </table>
    <h1 class="title is-2">Expenses</h1>
    <table class="table is-fullwidth">
      <thead>
        <th>Category</th>
        <th>Expense ($)</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="e in allExpenses" :key="e.id">
          <td>{{ categories[e.category] }}</td>
          <td>{{ e.cost }} $</td>
          <td><a @click="onDelete(e.id)">Delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NProgress from 'nprogress'
import LoadDataMixin from '../../mixins/LoadDataMixin'

export default {
  name: 'List',
  mixins: [LoadDataMixin],
  computed: {
    ...mapGetters('expenses', ['categories', 'allExpenses', 'sumsByCategory']),
    sums() {
      return Object.keys(this.sumsByCategory).map(cat => ({
        ...this.sumsByCategory[cat],
        id: cat
      }))
    }
  },
  methods: {
    onDelete(id) {
      NProgress.start()
      this.deleteExpense(id).finally(() => NProgress.done())
    },
    ...mapActions('expenses', ['deleteExpense'])
  },
  created() {
    console.log(this.$store.getters['expenses/sumsByCategory'])
  }
}
</script>

<style scoped></style>
