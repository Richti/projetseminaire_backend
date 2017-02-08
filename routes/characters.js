var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharactersDAO');

router.get('/', function(req, res, next){
	CharacterDAO.getAll()
	.then((result) => {
		var characters = { 
			"characters" : result
		};
		res.statusCode = 200;
		res.send(characters);
	})
	.catch((error) => {
		console.log(error);
		res.statusCode = 403;		
		res.send(error);
	})
});

router.get('/:id', function(req, res, next){
	CharacterDAO.getCharacter(req.params.id)
	.then((result) =>{
		var character = { 
			"character" : result[0]
		};
		res.statusCode = 200;
		res.send(character);
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;	
		res.send(error);
	})
});

router.delete('/:id', function(req, res, next){
	CharacterDAO.deleteCharacter(req.params.id)
	.then(function(result){
		res.statusCode = 200;
		res.send(result);
		console.log("character deleted");
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;	
	})
});


router.post('/', function(req, res, next){
	CharacterDAO.createCharacter(req)
	.then((result) => {
		var character = { 
			"character" : result
		};
		res.statusCode = 200;
		res.send(result);
		console.log("character created");
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;	
	})
});

router.put('/:id', function(req, res, next){
	if (req.params.id == req.body.character.id){
		CharacterDAO.updateCharacter(req)
		.then((result) => {
			var character = { 
				"character" : result[0]
			}
			res.statusCode = 200;
			res.send(character);
			console.log("character updated");
		})
		.catch(function(error){
			console.log(error);
			res.statusCode = 403;		
		})
	} else {
		res.statusCode = 403;
		res.send("Vous ne pouvez pas mettre à jour ce character");
	}
});

router.get('/class/:class', function(req, res, next){
	console.log(req.params.class);
	CharacterDAO.getCharactersByClass(req.params.class)
	.then((result) =>{
		var characters = { 
			"characters" : result
		};
		res.statusCode = 200;
		res.send(characters);
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;	
		res.send("Cette classe n'existe pas.");
	})
});

router.get('/:id/allies/:radius', function(req, res, next){
	CharacterDAO.getAlliesArroundXMeters(req)
	.then((result) =>{
		var allies = { 
			"allies" : result
		};
		res.statusCode = 200;
		res.send(allies);
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;	
		res.send("Aucun de tes amis sont dans les alentours ! T'es seul... Livré à toi même...");
	})
});

router.get('/:id/ennemies/:radius', function(req, res, next){
	CharacterDAO.getEnemiesArroundXMeters(req)
	.then((result) =>{
		var ennemies = { 
			"ennemies" : result
		};
		res.statusCode = 200;
		res.send(ennemies);
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;	
		res.send("Tu es tranquille ! Pas de méchants à l'horizon !");
	})
});


module.exports = router;