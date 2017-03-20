// state
const state = {
  loading: false, // 是否正在加载
  subjects: [], // 课程列表
  params: null, // 查询参数
  focus: null // 焦点课程
};

// getters
const getters = {

  /**
   * 课程数量
   * @param state
   * @param getters
   * @returns {Number}
   */
  subjectCount: (state, getters) => {
    return state.subjects.length;
  }
};

// actions
const actions = {

  /**
   * 获取课程列表
   * @param context
   * @param params
   */
  getSubjects: (context, params) => {
    context.commit('FETCH_SUBJECTS', {params});

    // 模拟Ajax请求
    setTimeout(() => {
      let data = [
        {id: 1, name: '语文'},
        {id: 2, name: '数学'},
        {id: 3, name: '英语'}
      ];

      context.commit('RECEIVE_SUBJECTS', {data});
    }, 500);
  }
};

// mutations
const mutations = {

  /**
   * 获取课程列表
   * @param state
   * @param params
   * @constructor
   */
  FETCH_SUBJECTS: (state, {params}) => {
    state.loading = true;
    state.params = params;
  },

  /**
   * 接受课程列表
   * @param state
   * @param data
   * @constructor
   */
  RECEIVE_SUBJECTS: (state, {data}) => {
    state.loading = false;
    state.subjects = data;
  },

  /**
   * 焦点课程
   * @param state
   * @param item
   * @constructor
   */
  FOCUS_SUBJECT: (state, {item}) => {
    state.focus = item;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}