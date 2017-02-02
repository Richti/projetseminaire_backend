var express = require('express');
var router = express.Router();
const AllianceDAO = require('../models/AlliancesDAO');

/* GET Alliances listing. */
router.get('/', function(req, res, next){
	AllianceDAO.getAll()
	.then((result) => {
		var alliances = { 
			"alliances" : result
		};
		res.statusCode = 200;
		res.send(alliances);
	})
	.catch((error) => {
		console.log(error);
		res.statusCode = 403;
		res.send(error);
	})
});

router.get('/:id', function(req, res, next){
	AllianceDAO.getAlliance(req.params.id)
	.then((result) =>{
		var alliance = { 
			"alliance" : result[0]
		};
		res.statusCode = 200;
		res.send(alliance);
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;
		res.send(error);
	})
});

router.delete('/:id', function(req, res, next){
	AllianceDAO.deleteAlliance(req.params.id)
	.then(function(result){
		res.statusCode = 200;
		res.send(result);
		console.log("alliance deleted");
	})
	.catch(function(error){
		res.statusCode = 403;
		console.log(error);
	})
});


router.post('/', function(req, res, next){
	AllianceDAO.createAlliance(req)
	.then((result) => {
		var alliance = { 
			"alliance" : result
		};
		res.statusCode = 200;
		res.send(result);
		console.log("alliance created");
	})
	.catch(function(error){
		res.statusCode = 403;
		console.log(error);
	})
});

router.put('/:id', function(req, res, next){
	if (req.params.id == req.body.alliance.id){
		AllianceDAO.updateAlliance(req)
		.then((result) => {
			var alliance = { 
				"alliance" : result[0]
			}
			res.statusCode = 200;
			res.send(alliance);
			console.log("alliance updated");
		})
		.catch(function(error){
			res.statusCode = 403;
			console.log(error);
		})
	} else {
		res.statusCode = 403;
		res.send("Vous ne pouvez pas mettre à jour cet alliance");
	}
});

router.get('/:id/users', function(req, res, next){
	AllianceDAO.getUsersFromAlliance(req.params.id)
	.then((result) =>{
		var users = { 
			"users" : result
		};
		res.statusCode = 200;
		res.send(users);
	})
	.catch(function(error){
		console.log(error);
		res.statusCode = 403;
		res.send(error);
	})
});

router.get('/:id/characters', function(req, res, next){
	AllianceDAO.getCharactersFromAlliance(req.params.id)
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
		res.send(error);
	})
});

router.get('/:id/characters/:class', function(req, res, next){
	AllianceDAO.getCharactersByClassFromAlliance(req.params.id, req.params.class)
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
		res.send(error);
	})
});



module.exports = router;
