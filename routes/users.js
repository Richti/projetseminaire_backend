var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UsersDAO');

/* GET users listing. */
router.get('/', function(req, res, next){
	UserDAO.getAll()
	.then((result) => {
		var users = { 
				"users" : result
		};
		res.statusCode = 200;
		res.send(users);
	})
	.catch((error) => {
		console.log(error);
	})
});

router.get('/:id', function(req, res, next){
	UserDAO.getUser(req.params.id)
	.then((result) =>{
		var user = { 
				"user" : result
		};
		res.statusCode = 200;
		res.send(user);
	})
	.catch(function(error){
		console.log(error);
		res.send(error);
	})
});

router.delete('/:id', function(req, res, next){
	UserDAO.deleteUser(req.params.id)
	.then(function(result){
		res.statusCode = 200;
		res.send(result);
		console.log("user deleted");
	})
	.catch(function(error){
		console.log(error);
	})
});


router.post('/', function(req, res, next){
	UserDAO.createUser(req)
	.then((result) => {
		var user = { 
				"user" : result
		};
		res.statusCode = 200;
		res.send(result);
		console.log("user created");
	})
	.catch(function(error){
		console.log(error);
	})
});

router.put('/:id', function(req, res, next){
	if (req.params.id == req.body.user.id){
		UserDAO.updateUser(req)
		.then((result) => {
			var user = { 
				"user" : result
			}
			res.statusCode = 200;
			res.send(user);
			console.log("user updated");
		})
		.catch(function(error){
			console.log(error);
		})
	} else {
		res.statusCode = 403;
		res.send("Vous ne pouvez pas mettre à jour cet user");
	}
});



module.exports = router;
