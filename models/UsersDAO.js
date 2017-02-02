const db = require('../models/Database');

module.exports = {

	getAll() {
		return db.query('SELECT * FROM users')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getUser(id) {
		return db.one('SELECT * FROM users WHERE id = '+ id)
		.then((result) =>{
			console.log(result);
			return result;
		})
		.catch((error)=> {
			throw error;
		})
	},

	createUser(req){
		return db.query('INSERT INTO users (name, email, alliance_id) VALUES (${name}, ${email}, ${alliance_id}) RETURNING *', req.body.user)
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	deleteUser(id){
		return db.query('DELETE FROM users WHERE id = $1', id)
		.then((result) =>{
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	updateUser(req){
		return db.one('UPDATE users SET name = ${name}, email = ${email}, alliance_id= ${alliance_id} WHERE id = ${id} RETURNING *', req.body.user)
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	}
}