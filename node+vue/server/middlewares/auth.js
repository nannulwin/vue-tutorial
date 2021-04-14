var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
router.use("/", function(req, res, next){
	var params = req.originalUrl.split('/');
	if (typeof params[2] != 'undefined')
	{
		switch(params[2].toLowerCase())
		{
			case "showposts" :
				next();
				break;
			case "login" :
				next();
				break;
			default :
				verify(req, res, next);
		}
	}
	else
	{
		verify(req, res, next);
	}
});

function verify(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.API_SECRET, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else { 
        next();
        return;
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}

module.exports = router;