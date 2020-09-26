var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

router.get('/', function(req, res) {

		res.render('tpRegistration/tpreg');

});

router.post('/', function(req, res)
{



		var user ={
			uname 		: req.body.uname,
			password	: req.body.password,
			email		: req.body.email,
			gender		: req.body.gender,
			education	: req.body.education,
			type		: req.body.type

		};

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/tpLogin');
			}else{
				res.redirect('/tpLogin');
			}
		});

});

module.exports = router;
