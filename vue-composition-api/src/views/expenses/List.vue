<template>
  <div class="container">
    <h1 class="title is-2">Expenses</h1>
    <table class="table is-fullwidth">
      <thead>
        <th>Category</th>
        <th>Expense ($)</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="e in expenses.all.value" :key="e.id">
          <td>{{ categories.all.value[e.category] }}</td>
          <td>{{ e.cost }} $</td>
          <td><a @click="expenses.remove(e.id)">Delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import useCategories from '../../composition/useCategories'
import useExpenses from '../../composition/useExpenses'
import useNProgress from '../../composition/useNProgress'
import useLoadData from '../../composition/useLoadData'

export default {
  name: 'List',
  setup(_, { root: { $store } }) {
    useLoadData($store)

    const categories = useCategories($store)
    const expenses = useExpenses($store)

    useNProgress(() => expenses.loading.value || categories.loading.value)
    return {
      categories,
      expenses
    }
  }
}
</script>

<style scoped></style>
