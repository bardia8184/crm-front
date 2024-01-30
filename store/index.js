import Cookie from 'cookie'

export const strict = false

export const state = () => ({
  uf_auth_token: '',
  profile: '',
})

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const cookies = Cookie.parse(req.headers.cookie || '')
    const token = cookies.uf_auth_token || ''
    if (token)
      commit('authenticate_token', {
        token,
      })
  },
}

export const mutations = {
  // set authenticate token
  authenticate_token(state, value) {
    state.uf_auth_token = value
  },
}
