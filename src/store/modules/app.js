
const state = {
  language: 'zh'
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    // localStorage.setItem('lang', language)
    // Cookies.set('language', language)
  }
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
