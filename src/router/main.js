import store from '../store/index'

export default {
  to (path, params = {}) {
    const token = store.state.userInfo.token
    if (!token) {
      this.$router.replace({ name: 'UserLogin', params })
    } else {
      this.$router.push({ name: path, params })
    }
  },
  go (path, params = {}) {
    const token = store.state.userInfo.token
    if (!token) {
      this.$router.replace({ name: 'UserLogin', params })
    } else {
      this.$router.replace({ name: path, params })
    }
  },
  back () {
    this.$router.go(-1)
  }
}
