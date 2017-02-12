const DB = require('../models/Database');

module.exports = {

	getAll() {
		return DB.accessor.query('SELECT * FROM characters')
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getCharacter(id) {
		return DB.accessor.query('SELECT * FROM characters WHERE id = ' + id)
		.then((result) =>{
			//console.log(result);
			return result;
		})
		.catch((error)=> {
			throw error;
		})
	},

	createCharacter(req){
		var character = req.body.character;
		character.position = "(" + character.position.x + "," + character.position.y + ")";
		return DB.accessor.query('INSERT INTO characters (name, class, user_id, position) VALUES (${name}, ${class}, ${user_id}, ${position}) RETURNING *', character)
		.then((result) => {
			//console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	deleteCharacter(id){
		return DB.accessor.query('DELETE FROM characters WHERE id = $1', id)
		.then((result) =>{
			//console.log(result);
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	updateCharacter(req){
		var character = req.body.character;
		character.position = "(" + character.position.x + "," + character.position.y + ")";
		return DB.accessor.query('UPDATE characters SET name = ${name}, class = ${class}, user_id= ${user_id}, position= ${position} WHERE id = ' + req.params.id + ' RETURNING *', character)
		.then((result) => {
			//console.log(result);
			return result;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		})
	},

	getCharactersByClass(class1) {
		return DB.accessor.query('SELECT * FROM characters WHERE class = $1;', class1)
		.then((result)=> {
			return result;
			})
		.catch((error)=> {
			throw error;
		})
	},

	getAlliesArroundXMeters(req){
		var id = req.params.id;
		var radius = req.params.radius;
        return DB.accessor.query(
            'SELECT characters.* ' 
            + 'FROM characters, users '
            + 'WHERE users.id = characters.user_id '
            + 'AND users.alliance_id = (SELECT users.alliance_id FROM users, characters '
            + 'WHERE users.id = characters.user_id AND characters.id = $(idChar)) '
            + 'AND characters.id <> $(idChar) '
            + 'AND $(zoneRadius) * acos ( '
	            + 'sin(radians(characters.position[0])) '
	            + '*sin(radians( (SELECT characters.position[0] FROM characters WHERE id = $(idChar)))) '
	            + '+cos(radians(characters.position[0]))'
	            + '*cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(idChar))))'
	            + '*cos( radians((SELECT characters.position[1] FROM characters WHERE id = $(idChar))) - radians(characters.position[1]) )'
            + ') < $(alliesRadius) ' 
            + 'ORDER BY acos ( '
	            + 'sin(radians(characters.position[0])) '
	            + '*sin(radians( (SELECT characters.position[0] FROM characters WHERE id = $(idChar)))) '
	            + '+ cos(radians(characters.position[0]))'
	            + '*cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(idChar))))'
	            + '*cos( radians((SELECT characters.position[1] FROM characters WHERE id = $(idChar))) - radians(characters.position[1]) )'
            + ')',
            {
                idChar : id,
                zoneRadius : 6371, //rayou de la terre en km
                alliesRadius: radius/1000                
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    },

    getEnemiesArroundXMeters(req){
    	var id = req.params.id;
		var radius = req.params.radius;
        return DB.accessor.query(
            'SELECT characters.* ' 
            + 'FROM characters, users '
            + 'WHERE users.id = characters.user_id '
            + 'AND users.alliance_id <> (SELECT users.alliance_id FROM users, characters '
            + 'WHERE users.id = characters.user_id AND characters.id = $(idChar)) '
            + 'AND characters.id <> $(idChar) '
            + 'AND $(zoneRadius) * acos ( '
	            + 'sin(radians(characters.position[0])) '
	            + '*sin(radians( (SELECT characters.position[0] FROM characters WHERE id = $(idChar)))) '
	            + '+cos(radians(characters.position[0]))'
	            + '*cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(idChar))))'
	            + '*cos( radians((SELECT characters.position[1] FROM characters WHERE id = $(idChar))) - radians(characters.position[1]) )'
            + ') < $(enemiesRadius) ' 
            + 'ORDER BY acos ( '
	            + 'sin(radians(characters.position[0])) '
	            + '*sin(radians( (SELECT characters.position[0] FROM characters WHERE id = $(idChar)))) '
	            + '+cos(radians(characters.position[0]))'
	            + '*cos(radians((SELECT characters.position[0] FROM characters WHERE id = $(idChar))))'
	            + '*cos( radians((SELECT characters.position[1] FROM characters WHERE id = $(idChar))) - radians(characters.position[1]) )'
            + ')',
            {
                idChar : id,
                zoneRadius : 6371, //rayou de la terre en km
                enemiesRadius: radius/1000
               
            }
        )
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw error;
            })
    }

}