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

	//Pas encore fini
	getAlliesArroundXMeters(req){
		var idCharacter = req.params.id;
		var position = req.params.position;
		//getposition_x : position[0]
		//getposition_y : position[1]
		//Position utiliser : postgis permettant d'avoir ST_DWithin
		console.log(position);
		return db.query('SELECT * ' + 
			'FROM characters c ' +
			'JOIN users u ON c.user_id = u.id ' +
			'JOIN alliances a ON u.alliance_id = a.id ' +
			'WHERE a.name =  ' +
				'(SELECT a.name  ' +
			    'FROM characters c ' +
				'JOIN users u ON c.user_id = u.id ' +
				'JOIN alliances a ON u.alliance_id = a.id ' +
			    'WHERE c.id = ' + idCharacter + ') ' +
			'AND c.id NOT IN (SELECT id FROM characters WHERE id = ' +  idCharacter+ ')')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getEnnemiesArroundXMeters(req){
		var idCharacter = req.params.id;
		var position = req.params.position;
		console.log(position);
		return db.query('SELECT * ' + 
			'FROM characters c ' +
			'JOIN users u ON c.user_id = u.id ' +
			'JOIN alliances a ON u.alliance_id = a.id ' +
			'WHERE NOT a.name =  ' +
				'(SELECT a.name  ' +
			    'FROM characters c ' +
				'JOIN users u ON c.user_id = u.id ' +
				'JOIN alliances a ON u.alliance_id = a.id ' +
			    'WHERE c.id = ' + idCharacter + ') ' +
			'AND c.id NOT IN (SELECT id FROM characters WHERE id = ' +  idCharacter+ ')')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	}


}