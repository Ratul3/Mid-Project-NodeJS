var express = require('express');
var upload = require('express-fileupload');
var db = require.main.require('./models/db');
var userModel = require.main.require('./models/user');
var usModel = require.main.require('./models/tp_profile');
var tpModel = require.main.require('./models/tp_list');
var avModel = require.main.require('./models/tp_available');
var tModel = require.main.require('./models/teacher');
var router = express.Router();

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/tpLogin');
	}else{
		next();
	}

});


router.get('/', function(req, res){

		res.render('dashboard/tphome', {uname: req.session.username});

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>get,post for UPLOADED_filename in tp_profile>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//
//
// router.get('/TP_Profile', function(req, res) {
//
// 			res.render('dashboard/TP_Profile');
//
// });
//
// router.post('/TP_Profile',function(req,res){
// 	if(req.files){
//
// 	var file= req.files.mypic;
// 	var filename = file.name;
// 	console.log(filename);
// }
//
// });
// // 	file.mv('./assets/'+filename, function (err)
// 	{
// 		if(err)
// 		{
// 			res.send(err);
// 		}
// 		else{
		// 	var user ={
		// 	uname 		: filename,
		// 	sname: req.body.sname,
		// 	id		: req.body.id
		// }
//
// 		uploadModel.insert(user, function(status){
// 			if(status){
// 				res.redirect('/home/upload/notes');
// 			}else{
// 				res.redirect('/home/upload/notes');
// 			}
// 		});
// 		}
// 	})
// 	}
// });


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>get,post for TP_Profile>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


router.get('/TP_Profile', function(req, res){

		usModel.getAll(function(result){

			res.render('dashboard/TP_Profile', { profile : result, uname: req.session.username});
		});

});

router.get('/TP_Profile/edit/:id', function(req, res) {

	usModel.get(req.params.id, function(result){
		res.render('dashboard/TP_profileUpdate', {pupdate: result});
	});

});

router.post('/TP_Profile/edit/:id', function(req, res){

	var pupdate =	{
		name: req.body.name,
		email: req.body.email,
		gen: req.body.gender,
		age: req.body.age,
		edu: req.body.education,
		bg: req.body.bg,
		la: req.body.LA,
		up: req.body.Up,

		id: req.params.id

	};

	usModel.update(pupdate, function(status){
	 if(status){
		 res.redirect('/dashboard/TP_Profile');
	 }else{
		 res.redirect('/dashboard/TP_Profile');
	 }
	});

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>get,post for TP_Lists>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



router.get('/TP_Lists', function(req, res){


		tpModel.getAll(function(result){
			res.render('dashboard/TP_Lists', { tp : result, uname: req.session.username});
		});

});

router.get('/TP_Lists/edit/:id', function(req, res){

	tpModel.get(req.params.id, function(result){
		res.render('dashboard/TP_edit', {tp: result});
	});

});

router.post('/TP_Lists/edit/:id', function(req, res){

	var tp =	{
		tpname 		: req.body.tpfname,
		username	: req.body.tpname,
		email			: req.body.email,
		gen				: req.body.gen,
		edu				: req.body.edu,

		id		: req.params.id

	};

	tpModel.update(tp, function(status){
	 if(status){
		 res.redirect('/dashboard/TP_Lists');
	 }else{
		 res.redirect('/dashboard/TP_Lists');
	 }
	});

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>get,post for TP_Available_Tuitions>>>>>>>>>>>>>>insert~~TP_Offered>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



router.get('/TP_Available_Tuitions', function(req, res){


		avModel.getAll(function(result){
			res.render('dashboard/TP_Available_Tuitions', { tuitionList : result, uname: req.session.username});
		});

});

router.get('/TP_Offered', function(req, res){

			res.render('dashboard/TP_Offered');
		});


router.get('/TP_Available_Tuitions/insert', function(req, res){

		res.render('dashboard/TP_Offered');

});

router.post('/TP_Available_Tuitions/insert', function(req, res){

		var offer =	{
			tname 		: req.body.tname,
			sname			: req.body.sname,
			class		: req.body.classofS,
			sub				: req.body.sub,
			area			: req.body.area

		}

		avModel.insert(offer, function(status){
			if(status){
				res.redirect('/dashboard/TP_Available_Tuitions');
			}else{
				res.redirect('/dashboard/TP_Available_Tuitions');
			}
		});

});


router.get('/TP_Available_Tuitions/edit/:serial', function(req, res){

	avModel.get(req.params.serial, function(result){
		res.render('dashboard/TP_Av_UPDATE', {available: result});
	});

});

router.post('/TP_Available_Tuitions/edit/:serial', function(req, res){

	var available =	{
		tname 		: req.body.tname,
		sname			: req.body.sname,
		class		: req.body.classofS,
		sub				: req.body.sub,
		area			: req.body.area,

		serial		: req.params.serial

	};

 avModel.update(available, function(status){
	 if(status){
		 res.redirect('/dashboard/TP_Available_Tuitions');
	 }else{
		 res.redirect('/dashboard/TP_Available_Tuitions');
	 }
	});

});

router.get('/TP_Available_Tuitions/delete/:serial', function(req, res){

	avModel.get(req.params.serial, function(result){
		res.render('dashboard/TP_Av_DELETE', {available: result});
	});

});

router.post('/TP_Available_Tuitions/delete/:serial', function(req, res){

	avModel.delete(req.body.serial, function(status){
		if(status){
			res.redirect('/dashboard/TP_Available_Tuitions');
		}else{
			res.redirect('/dashboard/TP_Available_Tuitions');
		}
	});

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>get,post for TP_Teacher_List>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



router.get('/TP_Teacher_List', function(req, res){


		tModel.getAll(function(result){
			res.render('dashboard/TP_Teacher_List', { teacher : result, uname: req.session.username});
		});

});

router.get('/tinsert', function(req, res){

			res.render('dashboard/tinsert');
		});


router.get('/TP_Teacher_List/insert', function(req, res){

		res.render('dashboard/tinsert');

});

router.post('/TP_Teacher_List/insert', function(req, res){

		var teacher =	{
			tname 		: req.body.tname,
			email			: req.body.email,
			gender		: req.body.gender,
			education	: req.body.education,
			provide		: req.body.provide

		}

		tModel.insert(teacher, function(status){
			if(status){
				res.redirect('/dashboard/TP_Teacher_List');
			}else{
				res.redirect('/dashboard/TP_Teacher_List');
			}
		});

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>get,post for TP_Student_List>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



module.exports = router;
