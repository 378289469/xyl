
export default {
  to (path, pageParam = {}) {
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
