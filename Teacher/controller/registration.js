var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var upload = require('express-fileupload');
var router 		= express.Router();

router.get('/', function(req, res){

		res.render('registration/index');
	
});

router.post('/', function(req, res){
	
if(req.files){
	
	var file= req.files.file;
	var filename = file.name;
	if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"){
	file.mv('./assets/'+file.name, function (err){
		if(err)
		{
			res.send(err);
		}
		else{

		var user ={
			uname 		: req.body.uname,
			password	: req.body.password,
			email		: req.body.email,
			gender		: req.body.gender,
			education	: req.body.education,
			type		: req.body.type,
            filename 	: filename
			 
		}

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/login');
			}
		});
		}
	})
}
else
{
	 var message = "This file is not allowed , please upload file with '.png', '.jpg'";
      res.render('registration/error',{message: message});
}
}	
});

router.get('/rules', function(req, res){

		res.render('registration/rules');
	
});


module.exports = router;