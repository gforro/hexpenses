import { computed } from '@vue/composition-api'
import { getCategories } from '../store/categories'
import { getAllExpenses } from '../store/expenses'

export default store => {
  const categories = computed(() => getCategories(store))
  const expenses = computed(() => getAllExpenses(store))

  const expensesSumByCategory = computed(() => {
    const expensesByCategory = Object.keys(categories.value).reduce(
      (sums, catKey) => {
        sums[catKey] = {
          id: catKey,
          text: categories.value[catKey],
          expenses: 0
        }
        return sums
      },
      {}
    )
    return expenses.value.reduce((sums, e) => {
      sums[e.category].expenses += e.cost
      return sums
    }, expensesByCategory)
  })

  return expensesSumByCategory
}
