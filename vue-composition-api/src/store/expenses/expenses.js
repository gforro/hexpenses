import axios from '../../utils/axios'

export const getLast5Expenses = store => store.getters['expenses/last5Expenses']
export const getAllExpenses = store => store.getters['expenses/allExpenses']
export const getLoading = store => store.getters['expenses/loading']
export const getSumsByCategory = store =>
  store.getters['expenses/sumsByCategory']

export const dispatchAddExpense = (store, expense) =>
  store.dispatch('expenses/add', expense)
export const dispatchGetExpenses = store =>
  store.dispatch('expenses/get')
export const dispatchDeleteExpense = (store, id) =>
  store.dispatch('expenses/delete', id)

/**
 * Data structure:
 * Expense example:
 *   {
 *     id: '134444',
 *     category: 'grocery',
 *     cost: 1111
 *   }
 */
export const store = {
  namespaced: true,
  state: {
    loading: false,
    expenses: []
  },
  getters: {
    loading: state => state.loading,
    allExpenses: state => state.expenses,
    last5Expenses: state => {
      const length = state.expenses.length
      const from = length < 5 ? 0 : length - 5
      return state.expenses.slice(from, length).reverse()
    },
    sumsByCategory: (state, _, rootState) => {
      const expensesByCategory = Object.keys(rootState.categories.categories).reduce(
        (sums, catKey) => {
          sums[catKey] = {
            text: rootState.categories.categories[catKey],
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
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    }
  },
  actions: {
    async add({ commit, rootGetters, dispatch }, expense) {
      try {
        commit('SET_LOADING', true)
        const idToken = rootGetters['user/idToken']
        await axios.post(
          `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/expenses.json?auth=${idToken}`,
          expense
        )
        await dispatch('_get')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async _get({rootGetters, commit}) {
      const idToken = rootGetters['user/idToken']
      const response = await axios.get(
        `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/expenses.json?auth=${idToken}`
      )
      commit('SET_EXPENSES', response.data ? response.data : [])
    },
    async get({ dispatch, commit }) {
      try {
        commit('SET_LOADING', true)
        await dispatch('_get')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async delete({ commit, rootGetters, dispatch }, id) {
      try {
        commit('SET_LOADING', true)
        const idToken = rootGetters['user/idToken']
        await axios.delete(
          `https://${process.env.VUE_APP_FB_PROJECT_ID}.firebaseio.com/expenses/${id}.json?auth=${idToken} `
        )
        await dispatch('_get')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}
