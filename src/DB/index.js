import DBF from 'dbfac'
export default DBF

DBF.create('Test', {
	sendRequest: {
		url: '/api/test',
		method: 'GET',
	},
})
