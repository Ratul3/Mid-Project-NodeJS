var db = require('./db');

module.exports ={

	get: function(id, callback){
		var sql = "select * from tplist where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from tplist";
		db.getResults(sql, null, function(result){
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
		var sql = "select * from user where username='"+user.uname+"' and password='"+user.password+"' and type='tp'";
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

update: function(tp, callback){

var sql = "update tplist set fname=?, username=?, email=?, gender=?, education=? where id=?";

  db.execute(sql, [tp.tpname, tp.username, tp.email, tp.gen, tp.edu, tp.id], function(status){
    if(status){

      callback(true);
    }else{
      callback(false);
    }
  });

}

}




	// insert: function(offer, callback){
	// 	var sql = "insert into provided_tuitions values(?, ?, ?, ?, ?, ?)";
  //
	// 	db.execute(sql, ['', offer.tname, offer.sname, offer.class, offer.sub, offer.area], function(status){
	// 		if(status){
	// 			callback(true);
	// 		}else{
	// 			callback(false);
	// 		}
	// 	});
	// },



	// delete: function(serial, callback){
	// 	var sql = "delete from provided_tuitions where serial=?";
	// 	db.execute(sql, [serial], function(status){
	// 		if(status){
	// 			callback(true);
	// 		}else{
	// 			callback(false);
	// 		}
	// 	});
	// }
