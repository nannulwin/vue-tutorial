var express = require('express');
var router = express.Router();
var user_model = require('../models/user_model');
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'log.txt' })
    ]
  });
//Auth
router.use(require('../middlewares/auth'));
//*****************USER*****************//
//UserList
router.post('/list', function(req, res) {
	user_model.userLists(req.body, function(err, data) { 
		res.json(data);
	});
});
//AddUser
router.post('/addUser', function(req, res) {
	user_model.addNewUser(req.body, function(err, data) { 
		res.json(data);
	});
});
//EditUser
router.post('/selectUserById', function(req, res) {
	user_model.selectUserById(req.body, function(err, data) { 
		res.json(data);
	});
});
//UpdateUser
router.post('/updateUser', function(req, res) {
	user_model.updateUserById(req.body, function(err, data) { 
		res.json(data);
	});
});
//DeleteUser
router.post('/deleteUser', function(req, res) {
	user_model.deleteUserById(req.body, function(err, data) { 
		res.json(data);
	});
});
//SearchUser
router.post('/searchUser', function(req, res) {
	user_model.searchUser(req.body, function(err, data) { 
		res.json(data);
	});
});
//Login
router.post('/login', function(req, res) {
	user_model.login(req.body, function(err, data) { 
		console.log(data);
		res.json(data);
	});
});


router.post('/aaa', function(req, res) {
	console.log("######");
});


module.exports = router;
