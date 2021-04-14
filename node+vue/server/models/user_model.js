var db = require('../db/config');
var winston = require('winston');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'log.txt' })
    ]
  });

//UserLists
exports.userLists = function(data,cb) {
	db._connection( function(err, connection) {
		connection.query("SELECT * FROM user", function(err, results) {
			connection.release();
			if (err) {
				cb(err, {});
				logger.log('error', err);
				return;
			}
			cb(null, results);
	    });
	});
};
//DeleteUserById
exports.deleteUserById = function (data, cb) { 
	var id = data.id; 
	db._connection(function (err, connection) { 		
		connection.query("DELETE FROM user WHERE user_id=" + id, function (err) {
			if (!err) { 
				connection.query("SELECT * FROM user", function (err, results) { 	
					connection.release();
					if (err) {	
						cb(err, {}); 
						logger.log('error', err);
						return; 					
					} 	
					cb(null, results); 		
				}); 			
			} else { 				
			connection.release();
			cb(err, {}); 
			logger.log('error', err);
			}			
		});
	});
}; 
//SearchUser
exports.searchUser = function (data, cb) { 
	db._connection( function(err, connection) {		
  		var searchName=data.searchName;	
		connection.query("SELECT * FROM user where user_name like '%"+searchName+"%'", function(err, results) {
			connection.release();
			if (err) {
				cb(err, {});
				logger.log('error', err);
				console.log("error")
				return;
			}
			cb(null, results);
	    });
	});
}; 
//AddNewUser
exports.addNewUser = function (data, cb) { 
	db._connection( function(err, connection) {		
		connection.query("INSERT INTO USER(user_name,email_address,password,phone_number,address,dath_of_birth) VALUE('"+data.userName+"','"+data.emailAddress+"','"+md5(md5(data.password))+"','"+data.phoneNumber+"','"+data.address+"','"+data.dob+"')", function(err, results) {
			if (!err) { 
				connection.query("SELECT * FROM user", function (err, results) { 	
					connection.release();
					if (err) {	
						cb(err, {}); 
						logger.log('error', err);
						return; 					
					} 	
					cb(null, results); 		
				}); 			
			} else { 				
				connection.release();
				cb(err, {}); 
				logger.log('error', err);
			}	
		});
	});
};
//SelectUserById
exports.selectUserById = function (data, cb) { 
	db._connection( function(err, connection) {		
		connection.query("SELECT * from user where user_id='"+data.userId+"'", function(err, results) {
			connection.release();
			if (err) {
				cb(err, {});
				logger.log('error', err);
				console.log("error")
				return;
			}
			cb(null, results);
		});
	});
};
//UpdateUserById
exports.updateUserById = function (data, cb) { 
	db._connection( function(err, connection) {	
		connection.query("UPDATE USER set user_name='"+data.newUserName+"',email_address='"+data.newEmailAddress+"',password='"+md5(md5(data.newPassword))+"',phone_number='"+data.newPhoneNumber+"',address='"+data.newAddress+"',dath_of_birth='"+data.newDob+"' where user_id='"+data.id+"'", function(err, results) {
			if (!err) { 
				connection.query("SELECT * FROM user", function (err, results) { 	
					connection.release();
					if (err) {	
						cb(err, {}); 
						logger.log('error', err);
						return; 					
					} 	
					cb(null, results); 		
				}); 			
			} else { 				
				connection.release();
				cb(err, {}); 
				logger.log('error', err);
			}	
		});
	});
};
//Login
exports.login=function(data,cb){
	db._connection(function(err,connection){
		connection.query("SELECT * from USER where email_address='"+data.emailAddress+"' AND password='"+md5(md5(data.password))+"'",function(err,results){
			connection.release();
			if(err){
				cb(err, {}); 
				logger.log('error', err);
			}
			if(results.length > 0){
				results[0]["token"] = jwt.sign({ email: results[0].email_address, id: results[0].user_id}, process.env.API_SECRET,{ expiresIn: '30m' });
			}
			cb(null, results);
		});
	});
};