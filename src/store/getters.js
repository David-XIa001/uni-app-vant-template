const getters = {
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  language: state => state.app.language,
  location: state => state.user.location
}
export default getters
