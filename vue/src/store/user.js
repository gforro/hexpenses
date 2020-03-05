import axios from '../utils/axios'

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    idToken: state => state.user ? state.user.idToken : null,
    userName: state => {
      return state.user ? (state.user.displayName ? state.user.displayName : state.user.email) : null
    }
  },
  mutations: {
    SET_USER(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    CLEAR_USER(state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  actions: {
    async login({commit}, {email, password}) {
      const now = new Date()
      try {
        const {data} = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_WEB_API_KEY}`,
          {
            email,
            password,
            returnSecureToken: true
          }
        )
        const loginExpiresIn = 1000 * parseInt(data.expiresIn)
        const userData = {
          email: email,
          uid: data.localId,
          idToken: data.idToken,
          refreshToken: data.refreshToken,
          name: data.displayName,
          expiresAt: now.getTime() + loginExpiresIn
        }
        commit('SET_USER', userData)
        return userData
      } catch(e) {
        console.log(e)
        console.log(e.response)
        throw e
      }
    },
    logout({commit}) {
      commit('CLEAR_USER')
    }
  }
}
