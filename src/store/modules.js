
const TIP_MSG = 'tip_msg'

export default ({
  state: {
    tipType: ''
  },
  mutations: {
    [TIP_MSG] (state, { type }) {
      state.tipType = type
    }
  },
  actions: {
    tipMsg ({ commit, state }, type) { // type 1加载中  2成功  3失败 4不能为空
      commit(TIP_MSG, { type })
    }
  },
  modules: {
  }
})
