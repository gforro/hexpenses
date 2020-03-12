import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user'
import { expenses } from './expenses'
import { categories } from './categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    expenses,
    categories
  }
})
