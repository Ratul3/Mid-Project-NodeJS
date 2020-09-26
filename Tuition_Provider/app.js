var express 		= require('express');
var upload 			= require('express-fileupload');
var exSession 		= require('express-session');
var bodyParser 		= require('body-parser');

var tplogin 		= require('./controller/tpLogin');
var tpregistration 	= require('./controller/tpRegistration');
var tphome 			= require('./controller/dashboard');
var tplogout 		= require('./controller/LogouT');
var app 			= express();																//app variables


//config
app.set('view engine', 'ejs');

//middleware
app.use(upload());
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false}));
app.use('/tpic', express.static('assets'));
app.use('/tpRegistration', tpregistration);
app.use('/tpLogin', tplogin);
app.use('/LogouT', tplogout);
app.use('/dashboard', tphome);

//router definition
app.get('/', function(req, res){
	res.send("<br><br><br><center><table><tr><td><center><h1><font color='red'><u><b>INDEX_TP</b></u></h1></font><br><br><font color='blue'><h2>[[ Already a MEMBER? Hit The Login link<br>Not a MEMBER? no worries, make a Registration your way... </h2></font></center><br><br><center><h1><font color='red'><a href='/tpLogin'> LOGiN</a> ~ ~ ~ <a href='/tpRegistration'> Registration</a> </center></h1></font></td></tr></table></center> ");

});

//server activation
app.listen(3000, function(){
	console.log('EXPRESS http SERVER BEGiNS...3000');
});
