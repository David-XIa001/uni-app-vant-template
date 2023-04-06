const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    location: {}
  }
}

const state = getDefaultState()

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_LOCATION: (state, location) => {
    state.location = location
  }
}

const actions = {
  getInfo({ commit, state }) {
    commit('SET_NAME', state.username)
    commit('SET_AVATAR', state.avatar)
    // return new Promise((resolve, reject) => {
    //   getInfo1()
    //     .then((response) => {
    //       const { data } = response
    //       if (!data) {
    //         return reject('Verification failed, please Login again.')
    //       }
    //       const { username, avatar } = data
    //       commit('SET_NAME', username)
    //       commit('SET_AVATAR', avatar)
    //       resolve(data)
    //     })
    //     .catch((error) => {
    //       reject(error)
    //     })
    // })
  },
  setLocation({ commit }, location) {
    commit('SET_LOCATION', location)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
