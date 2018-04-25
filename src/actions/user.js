// ================================
// Action Type
// ================================
const ADD = 'ADD'



// ================================
// Action Creator
// ================================
const add = (val) => ({
  type: ADD,
  payload: val
})



/* default 导出所有 Actions Creator */
export {
  add
}


// ================================
// Action handlers for Reducer(reducer的 switch case逻辑)
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [ADD]: (state, { payload }) => {
      console.log('dispatch')
      return state+payload
  }, // payload is userData
}
