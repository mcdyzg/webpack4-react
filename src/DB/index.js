import fetchPlus from './dbFactory'


// 本方法将在发送请求前调用，能接收到请求参数，如果有return，那么本次请求将会以return的值作为请求参数发送出去。如果没有return，将会使用原有参数。第二个参数表示将只会对create('Github',{})下的请求有效，如果不加表示所有请求都有效
fetchPlus.beforeUse((data)=>{
    console.log('请求将要发送')
    // return data.Github = 111
},'Github')


// 本方法将在请求后触发处理,第一个请求成功的回调，第二个请求失败的回调。
fetchPlus.afterUse((res)=>{
    console.log('请求发送成功')
    // if(Math.random()>0.5){
    //     return Promise.reject(res)
    // }else{
        return Promise.resolve(res)
    // }
},(err)=>{
    console.log(err.errorMsg)
},'Github')

let prefix = ''
if (__LOCAL__) {
    prefix = 'https://api.github.com/';
}
if (__PRO__) {
    prefix = 'https://api.github.com/';
}

fetchPlus.create('Github',{
    searchUsers: {
        url:prefix+'search/users',
        method: 'GET'
    },
})


export default fetchPlus.context;
