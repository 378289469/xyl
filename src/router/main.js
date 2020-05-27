
export default {
  to (path, pageParam = {}, token = '') {
    path = token ? path : 'UserLogin'
    this.$page.push({ name: path, pageParam })
  },
  back () {
    this.$page.close()
  }
}
