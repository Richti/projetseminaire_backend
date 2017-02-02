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
	})
});

router.get('/:id', function(req, res, next){
	AllianceDAO.getAlliance(req.params.id)
	.then((result) =>{
		var alliance = { 
				"alliance" : result
		};
		res.statusCode = 200;
		res.send(alliance);
	})
	.catch(function(error){
		console.log(error);
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
		console.log(error);
	})
});

router.put('/:id', function(req, res, next){
	if (req.params.id == req.body.alliance.id){
		AllianceDAO.updateAlliance(req)
		.then((result) => {
			var alliance = { 
				"alliance" : result
			}
			res.statusCode = 200;
			res.send(alliance);
			console.log("alliance updated");
		})
		.catch(function(error){
			console.log(error);
		})
	} else {
		res.statusCode = 403;
		res.send("Vous ne pouvez pas mettre à jour cet alliance");
	}
});



module.exports = router;
