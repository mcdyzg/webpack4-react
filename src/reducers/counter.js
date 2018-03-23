// 将action、action createot、reducer合并在一个文件里
import createReducer from '@utils/createReducer'
import { ACTION_HANDLERS } from '@actions/counter'


let initState = null ;
export default createReducer(initState, ACTION_HANDLERS)
