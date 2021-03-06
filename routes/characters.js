var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharactersDAO');

//Get all characters
router.get('/', function(req, res, next){
	CharacterDAO.getAll()
	.then((result) => {
		res.status(200)
        .json({
          status: 'success',
          characters: result
        });
	})
	.catch((error) => {
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Get a character by id
router.get('/:id', function(req, res, next){
	CharacterDAO.getCharacter(req.params.id)
	.then((result) => {
		res.status(200)
        .json({
	        status: "success",
	        character: result[0]
        });
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Delete a character
router.delete('/:id', function(req, res, next){
	CharacterDAO.deleteCharacter(req.params.id)
	.then(function(result){
		res.status(200)
        .json({
	        status: "success",
	        message: []
        });
		console.log("Character deleted");
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Create a character
router.post('/', function(req, res, next){
	CharacterDAO.createCharacter(req)
	.then((result) => {
		res.status(200)
        .json({
	        status: "success",
	        message: "Inserted one character",
	        character : result[0]
        });
		console.log("Character created !");
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);	
	})
});

//Update a character
router.put('/:id', function(req, res, next){
	//if (req.params.id == req.body.character.id){
		CharacterDAO.updateCharacter(req)
		.then((result) => {
			res.status(200)
        	.json({
		        status: "success",
		        message: "modified a character",
		        character : result[0]
        	});
			console.log("Character updated");
		})
		.catch(function(error){
			res.status(500).json({ status: 'Error', message: error })
			console.log(error);		
		})
	/*} else {
		res.statusCode = 403;
		res.send("Vous ne pouvez pas mettre à jour ce character");
	}*/
});

router.get('/all/:class', function(req, res, next){
	console.log(req.params.class);
	CharacterDAO.getCharactersByClass(req.params.class)
	.then((result) =>{
		res.status(200)
        	.json({
		        status: "success",
		        characters : result
        });
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

router.get('/:id/allies/:radius', function(req, res, next){
	CharacterDAO.getAlliesArroundXMeters(req)
	.then((result) =>{
		res.status(200)
        	.json({
		        status: "success",
		        characters : result
        });
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

router.get('/:id/ennemies/:radius', function(req, res, next){
	CharacterDAO.getEnemiesArroundXMeters(req)
	.then((result) =>{
		res.status(200)
		.json({
		        status: "success",
		        characters : result
        });
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});


module.exports = router;