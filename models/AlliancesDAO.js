const DB = require('../models/Database');

module.exports = {

	getAll() {
		return DB.accessor.query('SELECT * FROM alliances')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getAlliance(id) {
		return DB.accessor.query('SELECT * FROM alliances WHERE id = '+ id)
		.then((result) =>{
			console.log(result);
			return result;
		})
		.catch((error)=> {
			throw error;
		})
	},

	createAlliance(req){
		return DB.accessor.query('INSERT INTO alliances (name) VALUES (${name}) RETURNING *', req.body.alliance)
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
		return DB.accessor.query('DELETE FROM alliances WHERE id = $1', id)
		.then((result) =>{
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	updateAlliance(req){
		return DB.accessor.query('UPDATE alliances SET name = ${name} WHERE id = '+ req.params.id +' RETURNING *', req.body.alliance)
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	getUsersFromAlliance(idAlliance) {
		return DB.accessor.query('SELECT * FROM users WHERE alliance_id = $1', idAlliance)
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getCharactersFromAlliance(idAlliance) {
		return DB.accessor.query('SELECT c.id, c.name, c.user_id, c.class, c.position FROM characters c JOIN users u ON c.user_id = u.id WHERE u.alliance_id = $1', idAlliance)
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getCharactersByClassFromAlliance(idAlliance, class1) {
		return DB.accessor.query('SELECT c.id, c.name, c.user_id, c.class, c.position FROM characters c JOIN users u ON c.user_id = u.id WHERE u.alliance_id = $1 AND c.class = $2;', [idAlliance, class1])
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	}
	
}