var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from upload where id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},



	getAll: function(callback){
		var sql = "select * from upload";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


getByUname: function(callback){
		var sql = "select * from salary where teacher_name='Ratul'";
		db.getResults(sql, null, function(results){
			if(results.length > 0){

				console.log(results);
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},


	validate: function(user, callback){
		var sql = "select * from user where username='"+user.uname+"' and password='"+user.password+"'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(user, callback){
		var sql = "insert into upload values(?, ?, ?)";
	
		db.execute(sql, ['', user.uname, user.sname], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
var sql = "update upload set filename=?, student_name=? where id=?";

		db.execute(sql, [user.uname, user.sname, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},


	delete: function(id, callback){
		var sql = "delete from upload where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
