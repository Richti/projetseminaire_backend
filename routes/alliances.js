var express = require('express');
var router = express.Router();
const AllianceDAO = require('../models/AlliancesDAO');

//Get all alliances
router.get('/', function(req, res, next){
	AllianceDAO.getAll()
	.then((result) => {
		res.status(200)
        .json({
          status: 'success',
          alliances: result
        });
	})
	.catch((error) => {
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Get an alliance by id
router.get('/:id', function(req, res, next){
	AllianceDAO.getAlliance(req.params.id)
	.then((result) =>{
		res.status(200)
        .json({
          status: 'success',
          alliance: result[0]
        });
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Delete an alliance by id
router.delete('/:id', function(req, res, next){
	AllianceDAO.deleteAlliance(req.params.id)
	.then(function(result){
		res.status(200)
        .json({
          status: 'success',
          "message": []
        });
		console.log("Alliance deleted !");
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Create an alliance
router.post('/', function(req, res, next){
	AllianceDAO.createAlliance(req)
	.then((result) => {
		res.status(200)
        .json({
	        status: "success",
	        message: "Inserted one alliance",
	        alliance : result[0]
        });
		console.log("Alliance created");
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Update an alliance
router.put('/:id', function(req, res, next){
	//if (req.params.id == req.body.alliance.id){
		AllianceDAO.updateAlliance(req)
		.then((result) => {
			res.status(200)
        	.json({
		        status: "success",
		        message: "modified a alliance",
		        alliance : result[0]
        	});
			console.log("Alliance updated");
		})
		.catch(function(error){
			res.status(500).json({ status: 'Error', message: error })
			console.log(error);
		})
	/*} else {
		res.statusCode = 403;
		res.send("Vous ne pouvez pas mettre à jour cet alliance");
	}*/
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
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
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
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
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
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});


module.exports = router;
