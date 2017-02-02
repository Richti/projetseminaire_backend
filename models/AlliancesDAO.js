const db = require('../models/Database');

module.exports = {

	getAll() {
		return db.query('SELECT * FROM alliances')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getAlliance(id) {
		return db.one('SELECT * FROM alliances WHERE id = '+ id)
		.then((result) =>{
			console.log(result);
			return result;
		})
		.catch((error)=> {
			throw error;
		})
	},

	createAlliance(req){
		return db.query('INSERT INTO alliances (name) VALUES (${name}) RETURNING *', req.body.alliance)
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	deleteAlliance(id){
		return db.query('DELETE FROM alliances WHERE id = $1', id)
		.then((result) =>{
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	updateAlliance(req){
		return db.one('UPDATE alliances SET name = ${name} WHERE id = ${id} RETURNING *', req.body.alliance)
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