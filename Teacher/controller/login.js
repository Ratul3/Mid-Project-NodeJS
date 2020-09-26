var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){

	var user = {
		uname: req.body.uname,
		password: req.body.password,
		type	: req.body.type
	};

	userModel.validate(user, function(status){
		if(status){
			
			if(user.type=="teacher"){
			req.session.username = user.uname;
			res.redirect('/home');
			}
			else{
				res.redirect('/login');
			}
		}else{
			res.send('<font color="red"><h2>invalid username/ password/ type</h2></font><a href="/login">Back</a>');
		}
	});

});

module.exports = router;