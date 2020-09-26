var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from tp_profile where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from tp_profile";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	getByUname: function(username, callback){
			var sql = "select * from user where username=?";
			db.getResults(sql, [username], function(results){
				if(results.length > 0){
					callback(results[0]);
				}else{
					callback(null);
				}
			});
		},


		validate: function(user, callback){
			var sql = "select * from user where username=? and password=? and type=?";
			db.getResults(sql, [user.uname, user.password, user.type], function(result){
				if(result.length > 0){
					callback(true);
				}else{
					callback(false);
				}
			});
		},



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	update: function(pupdate, callback){
var sql = "update tp_profile set Name=?, Email=?, Gender=?, Age=?, Education=?, Blood_Group=?,  Living_Area=?,  UPLOADED_filename=? where id=?";

	db.execute(sql, [pupdate.name,pupdate.email, pupdate.gen, pupdate.age, pupdate.edu, pupdate.bg, pupdate.la, pupdate.up, pupdate.id], function(status){
		if(status){
			console.log(sql);
			callback(true);
		}else{
			callback(false);
		}

	});

}

}
