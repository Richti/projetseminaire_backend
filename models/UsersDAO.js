const DB = require('../models/Database');

module.exports = {

	getAll() {
		return DB.accessor.query('SELECT * FROM users')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getUser(id) {
		return DB.accessor.query('SELECT * FROM users WHERE id = '+ id)
		.then((result) =>{
			console.log(result);
			return result;
		})
		.catch((error)=> {
			throw error;
		})
	},

	createUser(req){
		return DB.accessor.query('INSERT INTO users (name, email, alliance_id) VALUES (${name}, ${email}, ${alliance_id}) RETURNING *', req.body.user)
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
		return DB.accessor.query('DELETE FROM users WHERE id = $1', id)
		.then((result) =>{
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	updateUser(req){
		return DB.accessor.query('UPDATE users SET name = ${name}, email = ${email}, alliance_id= ${alliance_id} WHERE id = ${id} RETURNING *', req.body.user)
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	getCharacters(userId) {
		return DB.accessor.query('SELECT * FROM characters WHERE user_id = ' + userId)
		.then((result) =>{
			console.log(result);
			return result;
		})
		.catch((error)=> {
			throw error;
		})
	}

}