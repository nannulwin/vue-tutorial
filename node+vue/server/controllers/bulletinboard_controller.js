var express = require('express');
var router = express.Router();
var bulletinboard_model = require('../models/bulletinboard_model');
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'log.txt' })
    ]
  });

const BaseJoi  = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
var userInputSchema = Joi.object({
  postName: Joi.string().required(),
  postDescription: Joi.string().required(),
  startDate: Joi.date().format("YYYY/MM/DD").required(),
  endDate: Joi.date().format("YYYY/MM/DD").required()
});
//Auth
router.use(require('../middlewares/auth'));
/* GET home page. */
router.get('/', function(req, res) {
  res.send("server working...");
});

//************BULLETIN_BOARD************//
//AddNewPost
router.post('/addPost', function(req, res) {
	logger.log('info', req.body);
/*	const ret = Joi.validate(req.body, userInputSchema);
	if (ret.error) {
		var message="Your input is not successful!."
		res.json({ msg:message});
	}
	else{*/
		bulletinboard_model.add_list(req.body, function(err, data) { 
		res.json(data);
	});
	//}
});
//Search
router.post('/searchPost', function(req, res,next) {
	bulletinboard_model.search_list(req.body, function(err, data) { 
		res.json(data);
	});
});
//Edit
router.post('/selectPostById', function(req, res) {
	bulletinboard_model.selectPostById(req.body,function(err,data){
	  	res.json(data);
	});
});
//Update
router.post('/updatePost', function(req, res) {
	const retUpdate = Joi.validate({postName:req.body.postName,postDescription:req.body.postDescription,startDate:req.body.startDate,endDate:req.body.endDate}, userInputSchema);
	if (retUpdate.error) {
		var message="Your update is not successful!."
		res.json({ msg:message});
	}else{
		bulletinboard_model.updatePost(req.body,function(err,data){
	  		res.json(data);
	    });
	}
});
//HomeList
router.get('/showPosts', function(req, res) {
	bulletinboard_model.show_list(req.body, function(err, data) { 
		res.json(data);
	});
});
//PostLists
router.post('/postlists', function(req, res) {
	bulletinboard_model.get_list(req.body, function(err, data) { 
		res.json(data);
	});
});
//Delete
router.post('/deletePost', function(req, res) {
	bulletinboard_model.deletePost(req.body, function(err, data) { 
		res.json(data);
	});
});

module.exports = router;

