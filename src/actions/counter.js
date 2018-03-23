import DB from '@DB'

// ================================
// Action Type
// ================================
const SETNEWDATA = 'SETNEWDATA'
const GETNEWTITLE = 'GETNEWTITLE'
const SETNEWURL = 'SETNEWURL'




// ================================
// Action Creator
// ================================
export const setNewData = (data) => {
	// const {title} = data
	return {
		type: SETNEWDATA,
		data:{
			...data,
			date:Date.now(),
		}
	}
}

export const setNewUrl = (data) => {
	// const {title} = data
	return {
		type: SETNEWURL,
		data,
	}
}

export const getNewTitle = ({ name }) => (dispatch, getState)=>{
    dispatch(setNewData({
        loading:true,
    }))
	return DB.Github.searchUsers({
    	q:name
    }).then(function (res) {
        dispatch(setNewData({
        	title:res.items[0].avatar_url,
            loading:false,
        }))
    });
}


export const getNewUrl = ({ name }) => {
	return async (dispatch, getState)=>{
        dispatch(setNewData({
            loading:true,
        }))

		let data = await DB.Github.searchUsers({
        	q:name
        })

		dispatch(setNewUrl(data.items[0].html_url))
        dispatch(setNewData({
            loading:false,
        }))
	}
}
// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
	[SETNEWDATA]: (state , action) => {
		let { data } = action
		return {
			...state,
			...data,
		}
	},
    [SETNEWURL]: (state , action) => {
		let { data } = action
		return {
			...state,
            urllist:{
                url:data
            },
		}
	},
}
