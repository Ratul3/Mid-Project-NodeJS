var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

router.get('/', function(req, res){

		res.render('registration/index');
	
});

router.post('/', function(req, res){
	


		var user ={
			uname 		: req.body.uname,
			password	: req.body.password,
			email		: req.body.email,
			gender		: req.body.gender,
			education	: req.body.education,
			type		: req.body.type,
			block       : req.body.blocked
			 
		};

		userModel.insert(user, function(status){
			if(status){
				console.log("Successful");
				res.redirect('/login');
			}else{
				console.log("Unsuccessful");
				res.redirect('/login');
			}
		});
	
});

router.get('/rules', function(req, res){

		res.render('registration/rules');
	
});


module.exports = router;