
export default {
  to (path, pageParam = {}) {
    const token = window.localStorage.getItem('Authorization')
    if (path !== 'UserLogin' && path !== 'UserRegister') {
      path = token ? path : 'UserLogin'
    }
    this.$page.push({
      name: path,
      pageParam,
      animation: {
        type: 'push',
        subType: 'from_left'
      }
    })
  },
  back () {
    this.$page.close()
  }
}
