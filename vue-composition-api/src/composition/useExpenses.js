import { computed, reactive, toRefs } from '@vue/composition-api'
import {
  dispatchAddExpense,
  dispatchDeleteExpense,
  dispatchGetExpenses,
  getAllExpenses,
  getLast5Expenses,
  getLoading
} from '../store/expenses'

export default store => {
  const data = reactive({
    loading: computed(() => getLoading(store)),
    all: computed(() => getAllExpenses(store)),
    last5: computed(() => getLast5Expenses(store))
  })
  return {
    ...toRefs(data),
    load: () => dispatchGetExpenses(store),
    add: (category, cost) => dispatchAddExpense(store, { category, cost }),
    remove: (id) => dispatchDeleteExpense(store, id)
  }
}
