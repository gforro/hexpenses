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
  </div>
</template>

<script>
import useExpensesSumByCategory from '../../composition/useExpensesSumByCategory'
import useLoadData from '../../composition/useLoadData';

export default {
  name: 'List',
  setup(_, { root: { $store } }) {
    useLoadData($store)

    const sums = useExpensesSumByCategory($store)
    return {
      sums
    }
  }
}
</script>

<style scoped></style>
