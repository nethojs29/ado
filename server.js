var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');


/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*
    Your middlewares or setups usually around here
*/
//API Router
var router = express.Router();// calling the outside routes
var tramite = require('./public/entidades/TramiteDB').router;
var bien = require('./public/entidades/BienDB').router;
var notificacion = require('./public/entidades/NotificacionDB').router;

router.get('/',function(req,res){
    res.render('../../index.html')
    //res.send("Welcome to Node JS");
});
router.get('/about',function(req,res){
    res.send("This is About page");
});

router.get('/bajas',function(req,res){
    res.render('BajaDeBien',{title:"Baja", data:[]});
});

router.get('/transferencias',function(req,res){
    res.render('transferencias',{title:"Transferencia", data:[]});
});

router.get('/donaciones',function(req,res){
    res.render('donaciones',{title:"Donacion", data:[]});
});

router.get('/peticiones',function(req,res){
    res.render('peticiones',{title:"Peticion", data:[]});
});

app.use('/',router);
app.use('/',tramite);
app.use('/',notificacion);
app.use('/',bien);

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);
});
