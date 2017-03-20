export default {

  /**
   * 获取学生详情
   * @param ctx
   * @param item
   */
  getStudentDetail: (ctx, {item}) => {
    ctx.commit('FETCH_STUDENT', {id: item.id});

    // 模拟Ajax请求
    setTimeout(() => {
      let data = Object.assign({}, item, {age: 25, country: '中国'});

      ctx.commit('RECEIVE_STUDENT', {data});
    }, 200);
  }
}