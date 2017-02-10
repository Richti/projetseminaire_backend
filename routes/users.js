var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UsersDAO');

//Get all users
router.get('/', function(req, res, next){
	UserDAO.getAll()
	.then((result) => {
		res.status(200)
        .json({
          status: 'success',
          users: result
        });
	})
	.catch((error) => {
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Get a user by id
router.get('/:id', function(req, res, next){
	UserDAO.getUser(req.params.id)
	.then((result) =>{
		res.status(200)
        .json({
          status: 'success',
          user: result[0]
        });
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Delete a user
router.delete('/:id', function(req, res, next){
	UserDAO.deleteUser(req.params.id)
	.then(function(result){
		res.status(200)
		.json({
	        status: "success",
	        message: []
        });
		console.log("User deleted !");
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Create a user
router.post('/', function(req, res, next){
	UserDAO.createUser(req)
	.then((result) => {
		res.status(200)
        .json({
	        status: "success",
	        message: "Inserted one user",
	        user : result[0]
        });
		console.log("user created");
	})
	.catch(function(error){
		res.status(500).json({ status: 'Error', message: error })
		console.log(error);
	})
});

//Update a user
router.put('/:id', function(req, res, next){
	//if (req.params.id == req.body.user.id){
		UserDAO.updateUser(req)
		.then((result) => {
			res.status(200)
        	.json({
		        status: "success",
		        message: "modified a user",
		        user : result[0]
        	});
			console.log("User updated !");
		})
		.catch(function(error){
			res.status(500).json({ status: 'Error', message: error })
			console.log(error);
		})
	/*} else {
		res.statusCode = 403;
		res.send("Vous ne pouvez pas mettre à jour cet user");
	}*/
});

router.get('/:id/characters', function(req, res, next){
	UserDAO.getCharacters(req.params.id)
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
