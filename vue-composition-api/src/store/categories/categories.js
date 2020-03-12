import axios from '../../utils/axios'

export const getCategories = store => store.getters['categories/categories']
export const getLoading = store => store.getters['categories/loading']
export const dispatchGetCategories = store => store.dispatch('categories/get')

/**
 * Data structure:
 * Category exmaple:
 *   {
 *     hobby: 'Hobby',
 *     grocery: 'Grocery'
 *   }
 */
export const store = {
  namespaced: true,
  state: {
    loading: false,
    categories: []
  },
  getters: {
    loading: state => state.loading,
    categories: state => state.categories
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    }
  },
  actions: {
    async get({ commit, rootGetters }) {
      try {
        commit('SET_LOADING', true)
        const idToken = rootGetters['user/idToken']
        const response = await axios.get(
          `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/categories.json?auth=${idToken} `
        )
        commit('SET_CATEGORIES', response.data)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
