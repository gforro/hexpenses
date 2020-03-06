import axios from '../utils/axios'

export default {
  namespaced: true,
  state: {
    user: null,
    _refreshTokenTimeoutID: undefined
  },
  getters: {
    idToken: state => (state.user ? state.user.idToken : null),
    userName: state => {
      return state.user
        ? state.user.displayName
          ? state.user.displayName
          : state.user.email
        : null
    },
    isAuthenticated: state => !!state.user
  },
  mutations: {
    SET_USER(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    CLEAR_USER(state) {
      clearTimeout(state._refreshTokenTimeoutID)
      state._refreshTokenTimeoutID = undefined
      state.user = null
      localStorage.removeItem('user')
    }
  },
  actions: {
    async login({ commit, dispatch }, { email, password }) {
      const now = new Date()
      try {
        const { data } = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_WEB_API_KEY}`,
          {
            email,
            password,
            returnSecureToken: true
          }
        )
        const idTokenExpiresIn = 1000 * parseInt(data.expiresIn)
        const userData = {
          email: email,
          uid: data.localId,
          idToken: data.idToken,
          refreshToken: data.refreshToken,
          name: data.displayName,
          expiresAt: now.getTime() + idTokenExpiresIn
        }
        commit('SET_USER', userData)
        await dispatch('scheduleRefreshToken')
        return userData
      } catch (e) {
        console.log(e)
        console.log(e.response)
        throw e
      }
    },
    logout({ commit }) {
      commit('CLEAR_USER')
    },
    async scheduleRefreshToken({ dispatch, state }) {
      console.log('do schedule refresh token')
      console.log(state)
      const now = new Date().getTime()
      const refreshDelay = state.user.expiresAt - now

      clearTimeout(state._refreshTokenTimeoutID)
      console.log(refreshDelay)
      if (refreshDelay < 4000) {
        await dispatch('refreshToken')
      } else {
        state._refreshTokenTimeoutID = setTimeout(
          () => dispatch('refreshToken'),
          refreshDelay
        )
      }
    },
    async refreshToken({ state, commit, dispatch }) {
      console.log('do refresh token')
      const now = new Date()
      const { data } = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_FB_WEB_API_KEY}`,
        {
          grant_type: 'refresh_token',
          refresh_token: state.user.refreshToken
        }
      )
      const idTokenExpiresIn = 1000 * parseInt(data.expires_in)
      const userData = {
        ...state.user,
        idToken: data.id_token,
        refreshToken: data.refresh_token,
        expiresAt: now.getTime() + idTokenExpiresIn
      }
      commit('SET_USER', userData)
      dispatch('scheduleRefreshToken')
    }
  }
}
