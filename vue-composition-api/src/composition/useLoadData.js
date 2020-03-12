import { dispatchGetCategories } from '../store/categories'
import { dispatchGetExpenses } from '../store/expenses'

export default store => {
  dispatchGetCategories(store)
  dispatchGetExpenses(store)
}
