var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UsersDAO');

/* GET users listing. */
router.get('/', function(req, res, next){
	UserDAO.getAll()
	.then((users) => {
		res.statusCode = 200;
		res.send(users);
	})
	.catch((error) => {
		console.log(error);
	})
});

router.get('/:id', function(req, res, next){
	UserDAO.getUser(req.params.id)
	.then((user) =>{
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
		res.statusCode = 200;
		res.send(result);
		console.log("user created");
	})
	.catch(function(error){
		console.log(error);
	})
});

router.put('/', function(req, res, next){
	UserDAO.updateUser(req)
	.then((result) => {
		res.statusCode = 200;
		res.send(result);
		console.log("user updated");
	})
	.catch(function(error){
		console.log(error);
	})
});



module.exports = router;
