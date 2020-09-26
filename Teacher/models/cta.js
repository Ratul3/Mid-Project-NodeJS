var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from cta where id=?";
		db.getResults(sql,[id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from cta";
		db.getResults(sql, null, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	
		students: function(callback){
		var sql = "select * from user where type='student'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
			teachers: function(callback){
		var sql = "select * from user where type='teacher'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	
	
	
	ctp: function(callback){
		var sql = "select * from user where type='tp'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},


getByUname: function(username, callback){
		var sql = "select * from user where username='"+username+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.uname+"' and password='"+user.password+"' and type='teacher'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(user, callback){
		var sql = "insert into cta values(?, ?, ?, ?)";
		db.execute(sql, ['', '', user.uname, ''], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

		update: function(user, callback){
var sql = "update user set username='"+user.username+"', password='"+user.password+"', email='"+user.email+"', type='"+user.type+"', gender='"+user.gender+"', education='"+user.education+"' where id='"+user.id+"'";
				
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	
	},
	

	delete: function(id, callback){
		var sql = "delete from cta where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}