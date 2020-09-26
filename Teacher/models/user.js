var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

		students: function(callback){
		var sql = "select * from user where type='student'";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
			teachers: function(callback){
		var sql = "select * from user where type='teacher'";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},



	ctp: function(callback){
		var sql = "select * from user where type='tp'";
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

	insert: function(user, callback){
	var sql = "insert into user values(?, ?, ?, ?, ?, ?, ?, ?)";



		db.execute(sql, ['', user.uname, user.password, user.email, user.gender, user.education, user.type, user.filename], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

		update: function(user, callback){
var sql = "update user set username=?, password=?, email=?, type=?, gender=?, education=? where id=?";

		db.execute(sql, [user.username, user.password, user.email, user.type, user.gender, user.education, user.id], function(status){
			if(status){
				console.log(sql);
				callback(true);
			}else{
				callback(false);
			}
		});

	},


	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
