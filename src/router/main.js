import store from '../store/index'

const token = store.state.userInfo.token
export default {
  to (path, params = {}) {
    if (!token) {
      this.$router.replace({ name: 'UserLogin', params })
    } else {
      this.$router.push({ name: path, params })
    }
  },
  go (path, params = {}) {
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
