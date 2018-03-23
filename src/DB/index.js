import DBF from './dbFactory'

export default DBF.context;

let prefix = ''
if (__LOCAL__) {
    prefix = 'https://api.github.com/';
}
if (__PRO__) {
    prefix = 'https://api.github.com/';
}

DBF.create('Github', {
    // 搜索用户信息
    searchUsers: {
        url: prefix + 'search/users',
        method: 'GET'
    },
})
