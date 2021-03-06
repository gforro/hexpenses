import axios from '../utils/axios'

/**
 * Data structure:
 * Category exmaple:
 *   {
 *     hobby: 'Hobby',
 *     grocery: 'Grocery'
 *   }
 * Expense example:
 *   {
 *     id: '134444',
 *     category: 'grocery',
 *     cost: 1111
 *   }
 */
export default {
  namespaced: true,
  state: {
    expenses: [],
    categories: []
  },
  getters: {
    last5Expenses: state => {
      const length = state.expenses.length
      const from = length < 5 ? 0 : length - 5
      return state.expenses.slice(from, length).reverse()
    },
    allExpenses: state => state.expenses,
    categories: state => state.categories,
    sumsByCategory: state => {
      const expensesByCategory = Object.keys(state.categories).reduce(
        (sums, catKey) => {
          sums[catKey] = {
            text: state.categories[catKey],
            expenses: 0
          }
          return sums
        },
        {}
      )
      return state.expenses.reduce((sums, e) => {
        sums[e.category].expenses += e.cost
        return sums
      }, expensesByCategory)
    }
  },
  mutations: {
    SET_EXPENSES(state, expenses) {
      state.expenses = Object.keys(expenses).map(id => ({
        id: id,
        ...expenses[id]
      }))
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async addExpense({ rootGetters, dispatch }, expense) {
      const idToken = rootGetters['user/idToken']
      await axios.post(
        `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/expenses.json?auth=${idToken}`,
        expense
      )
      await dispatch('getExpenses')
    },
    async getExpenses({ rootGetters, commit }) {
      const idToken = rootGetters['user/idToken']
      const response = await axios.get(
        `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/expenses.json?auth=${idToken}`
      )
      commit('SET_EXPENSES', response.data ? response.data : [])
    },
    async getCategories({ commit, rootGetters }) {
      const idToken = rootGetters['user/idToken']
      const response = await axios.get(
        `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/categories.json?auth=${idToken} `
      )
      commit('SET_CATEGORIES', response.data)
    },
    async deleteExpense({ rootGetters, dispatch }, id) {
      const idToken = rootGetters['user/idToken']
      await axios.delete(
        `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/expenses/${id}.json?auth=${idToken} `
      )
      await dispatch('getExpenses')
    }
  }
}
