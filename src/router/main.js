import store from '../store/index'
const tokens = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODk4Njc5OTcsInVzZXJuYW1lIjoiMTM3NTMxNjcwNjU6emJsIn0.9MoIDIJyWifLmW5hCBamK1WzLfT-nXo01ymqZ3MDf2s'

export default {
  to (path, params = {}) {
    const token = store.state.userInfo.result ? store.state.userInfo.result.token : tokens
    if (!token) {
      // this.$router.replace({ name: 'UserLogin', params })
      this.$page.push({ name: 'UserLogin', params })
    } else {
      // this.$router.push({ name: path, params })
      this.$page.push({ name: path, params })
    }
  },
  go (path, params = {}) {
    const token = store.state.userInfo.result ? store.state.userInfo.result.token : tokens
    if (!token) {
      // this.$router.replace({ name: 'UserLogin', params })
      this.$page.push({ name: 'UserLogin', params })
    } else {
      // this.$router.replace({ name: path, params })
      this.$page.push({ name: path, params })
    }
  },
  back () {
    // this.$router.go(-1)
    this.$page.go(-1)
  }
}
