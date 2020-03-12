import { watch } from '@vue/composition-api'
import NProgress from 'nprogress'

export default isLoadingGetter => {
  watch(isLoadingGetter, loading => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  })
}
