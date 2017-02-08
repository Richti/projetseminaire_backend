const db = require('../models/Database');

module.exports = {

	getAll() {
		return db.query('SELECT * FROM characters')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getCharacter(id) {
		return db.query('SELECT * FROM characters WHERE id = ' + id)
		.then((result) =>{
			console.log(result);
			return result;
		})
		.catch((error)=> {
			throw error;
		})
	},

	createCharacter(req){
		var character = req.body.character;
		character.position = "(" + character.position.x + "," + character.position.y + ")";
		return db.query('INSERT INTO characters (name, class, user_id, position) VALUES (${name}, ${class}, ${user_id}, ${position}) RETURNING *', character)
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	deleteCharacter(id){
		return db.query('DELETE FROM characters WHERE id = $1', id)
		.then((result) =>{
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	updateCharacter(req){
		var character = req.body.character;
		character.position = "(" + character.position.x + "," + character.position.y + ")";
		return db.query('UPDATE characters SET name = ${name}, class = ${class}, user_id= ${user_id}, position= ${position} WHERE id = ${id} RETURNING *', character)
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	getCharactersByClass(class1) {
		return db.query('SELECT * FROM characters WHERE class = $1;', class1)
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getAlliesArroundXMeters(req){
		var idCharacter = req.params.id;
		var radius = req.params.radius;
		var req = 'SELECT c.id, c.name, c.class, c.position, a.name ' +
					'FROM characters c ' +
					'JOIN users u ON c.user_id = u.id ' +
					'JOIN alliances a ON u.alliance_id = a.id ' +
					'WHERE a.id = ' +
					'(SELECT a.id ' +
					'FROM characters c ' + 
					'JOIN users u ON c.user_id = u.id ' +
					'JOIN alliances a ON u.alliance_id = a.id ' +
					'WHERE c.id = ' + idCharacter + ') ' +

					'AND ' +
					'(SELECT position::point <-> (SELECT position ' + 
					'FROM characters ' +
					'WHERE id = ' + idCharacter + ')::point) <= ' + radius +
					
					'AND c.id NOT IN (SELECT id FROM characters WHERE c.id = ' + idCharacter + ')';
		//console.log("ID : " + idCharacter + " - Radius" + radius);
		return db.query(req)
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getEnemiesArroundXMeters(req){
		var idCharacter = req.params.id;
		var radius = req.params.radius;
		var req = 'SELECT c.id, c.name, c.class, c.position, a.name ' +
					'FROM characters c ' +
					'JOIN users u ON c.user_id = u.id ' +
					'JOIN alliances a ON u.alliance_id = a.id ' +
					'WHERE NOT a.id = ' +
					'(SELECT a.id ' +
					'FROM characters c ' + 
					'JOIN users u ON c.user_id = u.id ' +
					'JOIN alliances a ON u.alliance_id = a.id ' +
					'WHERE c.id = ' + idCharacter + ') ' +

					'AND ' +
					'(SELECT position::point <-> (SELECT position ' + 
					'FROM characters ' +
					'WHERE id = ' + idCharacter + ')::point) <= ' + radius +

					'AND c.id NOT IN (SELECT id FROM characters WHERE c.id = ' + idCharacter + ')';
		//console.log("ID : " + idCharacter + " - Radius" + radius);
		return db.query(req)
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	}


}