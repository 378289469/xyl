import store from '../store/index'
const tokens = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODk4Njc5OTcsInVzZXJuYW1lIjoiMTM3NTMxNjcwNjU6emJsIn0.9MoIDIJyWifLmW5hCBamK1WzLfT-nXo01ymqZ3MDf2s'

export default {
  to (path, pageParam = {}) {
    const token = store.state.userInfo.result ? store.state.userInfo.result.token : tokens
    if (!token) {
      // this.$router.replace({ name: 'UserLogin', params })
      this.$page.open({ name: 'UserLogin', pageParam })
    } else {
      // this.$router.push({ name: path, params })
      this.$page.push({ name: path, pageParam })
    }
  },
  go (path, params = {}) {
    const token = store.state.userInfo.result ? store.state.userInfo.result.token : tokens
    if (!token) {
      // this.$router.replace({ name: 'UserLogin', params })
      this.$page.open({ name: 'UserLogin', params })
    } else {
      // this.$router.replace({ name: path, params })
      this.$page.open({ name: path, params })
    }
  },
  back () {
    // this.$router.go(-1)
    this.$page.close()
  }
}
