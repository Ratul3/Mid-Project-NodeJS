var express = require('express');
var upload = require('express-fileupload');
var db = require.main.require('./models/db');
var userModel = require.main.require('./models/user');
var availableModel = require.main.require('./models/available');
var offeredModel = require.main.require('./models/offered');
var ratingsModel = require.main.require('./models/ratings');
var salaryModel = require.main.require('./models/salary');
var uploadModel = require.main.require('./models/upload');
var scheduleModel = require.main.require('./models/schedule');
var examModel = require.main.require('./models/exam');
var rnoticesModel = require.main.require('./models/rnotices');
var pnoticesModel = require.main.require('./models/pnotices');
var gradeModel = require.main.require('./models/grade');
var ctaModel = require.main.require('./models/cta');
var router = express.Router();


router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/', function(req, res){


		res.render('home/index', {uname: req.session.username});

});

router.get('/upload', function(req, res){



			res.render('home/upload');


});

router.post('/upload',function(req,res){
		if(req.files)
		{
			var file= req.files.file;
			var filename = file.name;
			console.log(req.files);

			file.mv('./assets/'+filename, function (err)
			{
				if(err)
				{
					res.send(err);
				}
				else
				{

					var user = 	{

						uname 	: filename,
						sname		: req.body.sname,
						id					: req.body.id

					}

					uploadModel.insert (user, function(status)
					{

						if(status)
						{
							res.redirect('/home/upload/notes');
						}
						else
						{
							res.redirect('/home/upload/notes');
						}

					});

				}
	})
	}
});


// router.get('/upload/notes', function(req, res){
//
//
// 		uploadModel.getAll(function(results){
// 			res.render('home/notes', { results : results});
// 		});
//
// });
//
//
// router.get('/notes/update/:id', function(req, res){
//
// 	userModel.get(req.params.id, function(result){
// 		res.render('home/upload', {user: result});
// 	});
//
// });
//
// router.post('/notes/update/:id', function(req, res){
//
// 		var user = {
// 			uname 		: filename,
// 			sname: req.body.sname,
// 			id		: req.body.id
// 	};
//
//  uploadModel.update(user, function(status){
// 		if(status){
// 			res.redirect('/home/upload/notes');
// 		}else{
// 			res.redirect('/home/upload/notes');
// 		}
// 	});
//
// });


router.get('/upload/notes/delete/:id', function(req, res){

	uploadModel.get(req.params.id, function(results){
		res.render('home/notesdelete', {user: results});
	});

});

router.post('/upload/notes/delete/:id', function(req, res){

	uploadModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/upload/notes');
		}else{
			res.redirect('/home/upload/notes');
		}
	});

});
//
// router.get('/upload/notes/upload/:id', function(req, res){
//
// 	uploadModel.get(req.params.id, function(results){
// 		res.render('home/upload', {user: results});
// 	});
//
// });
//
// router.post('/upload/notes/upload/:id',function(req,res){
// 	if(req.files){
//
// 	var file= req.files.file;
// 	var filename = file.name;
// 	console.log(filename);
// 	file.mv('./assets/'+filename, function (err)
// 	{
// 		if(err)
// 		{
// 			res.send(err);
// 		}
// 		else{
// 			var user = {
// 			uname 		: filename,
// 			sname: req.body.sname,
// 			id		: req.body.id
// 		}
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
//
//
//

router.get('/profile', function(req, res){


		var username = req.session.username;
		userModel.getByUname(username, function(results){

			res.render('home/profile', { userList : results, uname: req.session.username});
		});


});

router.get('/salary', function(req, res){


		salaryModel.getAll(function(results){
			res.render('home/salary', { results : results, uname: req.session.username});
		});

});

/*
router.get('/salary', function(req, res){


salaryModel.getByUname(function(results){

			res.render('home/salary', {results});
		});


});
*/

router.get('/cta', function(req, res){



			res.render('home/cta');


});

router.get('/cta/ctacheck', function(req, res){


		ctaModel.getAll(function(results){
			res.render('home/ctacheck', { results : results, uname: req.session.username});
		});

});

router.get('/schedule', function(req, res){


		scheduleModel.getAll(function(results){
			res.render('home/schedule', { results : results, uname: req.session.username});
		});

});
router.get('/exam/take/questions', function(req, res){


		examModel.getAll(function(results){
			res.render('home/questions', { results : results, uname: req.session.username});
		});

});
router.get('/script', function(req, res){


		examModel.getAll(function(results){
			res.render('home/script', { results : results, uname: req.session.username});
		});

});
router.get('/exam/grades/checkgrades', function(req, res){


		gradeModel.getAll(function(results){
			res.render('home/checkgrades', { results : results, uname: req.session.username});
		});

});
router.get('/notices/read', function(req, res){


		rnoticesModel.getAll(function(results){
			res.render('home/read', { userList : results, uname: req.session.username});
		});

});
router.get('/notices/post/postednotices', function(req, res){


		pnoticesModel.getAll(function(results){
			res.render('home/posted', { results : results, uname: req.session.username});
		});

});




router.get('/availabletuition', function(req, res){


		availableModel.getAll(function(results){
			res.render('home/available', { userList : results, uname: req.session.username});
		});

});

router.get('/offeredtuition', function(req, res){


		offeredModel.getAll(function(results){
			res.render('home/offered', { userList : results, uname: req.session.username});
		});

});

router.get('/studentsinfo', function(req, res){


		userModel.students(function(results){
			res.render('home/studentsinfo', { userList : results, uname: req.session.username});
		});

});

router.get('/teachersinfo', function(req, res){


		userModel.teachers(function(results){
			res.render('home/teachersinfo', { userList : results, uname: req.session.username});
		});

});

router.get('/exam', function(req, res){



			res.render('home/exam');


});

router.get('/notices', function(req, res){



			res.render('home/notices');


});

router.get('/ctp', function(req, res){


		userModel.ctp(function(results){
			res.render('home/ctp', { userList : results, uname: req.session.username});
		});

});


router.get('/ratings', function(req, res){


		ratingsModel.getAll(function(results){
			res.render('home/ratings', { userList : results, uname: req.session.username});
		});



});




router.get('/create', function(req, res){

		res.render('home/add');

});

router.post('/create', function(req, res){



		var user ={
			uname 		: req.body.uname,
			password	: req.body.password,
			type		: req.body.type
		}

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/create');
			}
		});

});


router.get('/delete/:id', function(req, res){

	userModel.get(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});

});





router.post('/delete/:id', function(req, res){

	userModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/view_users');
		}else{
			res.redirect('/home');
		}
	});

});


router.get('/salary/delete/:id', function(req, res){

	salaryModel.get(req.params.id, function(result){
		res.render('home/sdelete', {user: result});
	});

});

router.post('/salary/delete/:id', function(req, res){

	salaryModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/salary');
		}else{
			res.redirect('/home/salary');
		}
	});

});


router.get('/salary/insert', function(req, res){

		res.render('home/sinsert');

});

router.post('/salary/insert', function(req, res){



		var user ={
			uname 		: req.body.uname,
			salary	: req.body.salary,
			id		: req.body.id
		}

		salaryModel.insert(user, function(status){
			if(status){
				res.redirect('/home/salary');
			}else{
				res.redirect('/home/salary');
			}
		});

});
router.get('/cta/ctainsert', function(req, res){

		res.render('home/ctainsert');

});

router.post('/cta/ctainsert', function(req, res){



		var user ={
			uname 		: req.body.uname,

			id		: req.body.id
		}

		ctaModel.insert(user, function(status){
			if(status){
				res.redirect('/home/cta/ctacheck');
			}else{
				res.redirect('/home/cta/ctacheck');
			}
		});

});

router.get('/cta/ctacheck/delete/:id', function(req, res){

	ctaModel.get(req.params.id, function(result){
		res.render('home/ctadelete', {user: result});
	});

});

router.post('/cta/ctacheck/delete/:id', function(req, res){

	ctaModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/cta/ctacheck');
		}else{
			res.redirect('/home/cta/ctacheck');
		}
	});

});



router.get('/schedule/insert', function(req, res){

		res.render('home/insertschedule');

});

router.post('/schedule/insert', function(req, res){



		var user ={
			uname 		: req.body.uname,
			day	: req.body.day,
			time	: req.body.time,
			id		: req.body.id
		}

		scheduleModel.insert(user, function(status){
			if(status){
				res.redirect('/home/schedule');
			}else{
				res.redirect('/home/schedule');
			}
		});

});







router.get('/exam/take', function(req, res){

		res.render('home/take');

});

router.post('/exam/take', function(req, res){



		var user ={
			uname 		: req.body.uname,
			question	: req.body.question,
			date	: req.body.date,
			id		: req.body.id
		}

		examModel.insert(user, function(status){
			if(status){
				res.redirect('/home/exam/take/questions');
			}else{
				res.redirect('/home/exam/take');
			}
		});

});

router.get('/exam/take/questions/delete/:id', function(req, res){

	examModel.get(req.params.id, function(result){
		res.render('home/qdelete', {user: result});
	});

});

router.post('/exam/take/questions/delete/:id', function(req, res){

	examModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/exam/take/questions');
		}else{
			res.redirect('/home/questions');
		}
	});


});


router.get('/exam/grades', function(req, res){

		res.render('home/grades');

});

router.post('/exam/grades', function(req, res){



		var user ={
			uname 		: req.body.uname,
			grade	: req.body.grade,
			date	: req.body.date,
			id		: req.body.id
		}

		gradeModel.insert(user, function(status){
			if(status){
				res.redirect('/home/exam/grades/checkgrades');
			}else{
				res.redirect('/home/exam/grades');
			}
		});

});

router.get('/exam/grades/checkgrades/delete/:id', function(req, res){

	gradeModel.get(req.params.id, function(result){
		res.render('home/gdelete', {user: result});
	});

});

router.post('/exam/grades/checkgrades/delete/:id', function(req, res){

	gradeModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/exam/grades/checkgrades');
		}else{
			res.redirect('/home/exam/grades/checkgrades');
		}
	});

});

router.get('/notices/post', function(req, res){

		res.render('home/post');

});

router.post('/notices/post', function(req, res){


		var user ={
			uname 		: req.body.uname,
			notice	: req.body.notice,
			date	: req.body.date,
			id		: req.body.id
		}

		pnoticesModel.insert(user, function(status){
			if(status){
				res.redirect('/home/notices/post/postednotices');
			}else{
				res.redirect('/home/notices/post/postednotices');
			}
		});

});
router.get('/notices/post/postednotices/delete/:id', function(req, res){

	pnoticesModel.get(req.params.id, function(result){
		res.render('home/pdelete', {user: result});
	});

});

router.post('/notices/post/postednotices/delete/:id', function(req, res){

	pnoticesModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/notices/post/postednotices');
		}else{
			res.redirect('/home/notices/post/postednotices');
		}
	});

});

router.get('/salary/edit/:id', function(req, res){

	salaryModel.get(req.params.id, function(result){
		res.render('home/sedit', {user: result});
	});

});

router.post('/salary/edit/:id', function(req, res){

		var user = {
		name: req.body.name,
		salary: req.body.salary,

		id: req.params.id
	};

 salaryModel.update(user, function(status){
		if(status){
			res.redirect('/home/salary');
		}else{
			res.redirect('/home/salary');
		}
	});

});


router.get('/schedule/edit/:id', function(req, res){

	scheduleModel.get(req.params.id, function(result){
		res.render('home/editschedule', {user: result});
	});

});

router.post('/schedule/edit/:id', function(req, res){

		var user = {
		name: req.body.name,
		day: req.body.day,
		time: req.body.time,

		id: req.params.id
	};

 scheduleModel.update(user, function(status){
		if(status){
			res.redirect('/home/schedule');
		}else{
			res.redirect('/home/schedule');
		}
	});

});

router.get('/schedule/delete/:id', function(req, res){

	scheduleModel.get(req.params.id, function(result){
		res.render('home/deleteschedule', {user: result});
	});

});

router.post('/schedule/delete/:id', function(req, res){

	scheduleModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/schedule');
		}else{
			res.redirect('/home/schedule');
		}
	});

});

router.get('/profile/edit/:id', function(req, res){

	userModel.get(req.params.id, function(result){
		res.render('home/pedit', {user: result});
	});

});

router.post('/profile/edit/:id', function(req, res){

		var user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		type: req.body.type,
		gender: req.body.gender,
		education: req.body.education,
	    id: req.params.id
	};

 userModel.update(user, function(status){
		if(status){
			res.redirect('/home/profile');
		}else{
			res.redirect('/home/profile');
		}
	});

});

module.exports = router;
