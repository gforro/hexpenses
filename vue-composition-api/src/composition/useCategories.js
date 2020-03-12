import { computed, reactive, toRefs } from '@vue/composition-api'
import {
  dispatchGetCategories,
  getCategories,
  getLoading
} from '../store/categories'

export default store => {
  const data = reactive({
    all: computed(() => getCategories(store)),
    loading: computed(() => getLoading(store))
  })
  return {
    ...toRefs(data),
    load: () => dispatchGetCategories(store)
  }
}
