var db = require('../db/config');
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'log.txt' })
    ]
  });
//AddNewPost
exports.add_list = function(data,cb) {
	db._connection( function(err, connection) {
		connection.query("INSERT INTO bulletin_board (user_id,post_name, post_description,start_date,end_date) VALUES ("+data.loginUserId + ",'" +data.postName + "','" + data.postDescription + "','"+data.startDate+ "','" +data.endDate+ "')", function(err, rows) {
			if (!err){
				connection.query("SELECT * FROM bulletin_board where user_id="+data.loginUserId, function (err, results) { 	
					connection.release();
					if (err) {	
						cb(err, {}); 
						logger.log('error', err);
						return; 					
					} 	
					cb(null, results); 		
				});
			}
			else { 				
				connection.release();
				cb(err, {}); 
				logger.log('error', err);
			}
	    });
	});
};
//SelectPostById
exports.selectPostById=function(data,cb){
	db._connection(function(err,connection){
		var id=data.id;
		connection.query("SELECT * FROM bulletin_board where bulletin_board_id='"+id+"'", function(err, rows) {
         	connection.release();
			if (err) {
				cb(err, {});
				logger.log('error', err);
				return;
			}
			cb(null,rows);
			logger.log('info', rows);
	    });
	});
};
//UpdatePost
exports.updatePost=function(data,cb){
   var updateQuery="Update bulletin_board set post_name='"+data.postName+"',post_description='"+data.postDescription+"',start_date='"+data.startDate+"',end_date='"+data.endDate+"' where bulletin_board_id='"+data.id+"'";
	db._connection(function(err,connection){
		connection.query(updateQuery, function(err) {
			if (!err){
				connection.query("SELECT * FROM bulletin_board where user_id="+data.loginUserId, function (err, results) { 	
					connection.release();
					if (err) {	
						cb(err, {}); 
						logger.log('error', err);
						return; 					
					} 	
					cb(null, results); 		
				});
			}
			else { 				
				connection.release();
				cb(err, {}); 
				logger.log('error', err);
			}
	    });
	});
};
//Delete Data 
exports.deletePost = function (data, cb) { 
	var id = data.id; 
	db._connection(function (err, connection) { 		
		connection.query("DELETE FROM bulletin_board WHERE bulletin_board_id=" + id, function (err) {
			if (!err) { 
				connection.query("SELECT * FROM bulletin_board where user_id="+data.loginUserId, function (err, results) { 	
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
//ShowList
exports.show_list = function(data,cb) {
	db._connection( function(err, connection) {
		connection.query("SELECT * FROM bulletin_board WHERE start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE; ", function(err, results) {
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
//GetList
exports.get_list = function(data,cb) {
	db._connection( function(err, connection) {
		connection.query("SELECT * FROM bulletin_board where user_id="+data.loginUserId, function(err, results) {
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
//SearchList
exports.search_list = function(data,cb) {
	db._connection( function(err, connection) {		
  		var postName=data.postName;	
		connection.query("SELECT * FROM bulletin_board where user_id="+data.loginUserId+" and post_name like '%"+postName+"%'", function(err, results) {
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


			