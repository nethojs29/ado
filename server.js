var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator'),
    session = require('express-session');

    var connection  = require('express-myconnection'),
        mysql = require('mysql');

        var pool = mysql.createPool({
        connectionLimit: 1000,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ADOO'
        });


app.set('views','./views');
app.set('view engine','ejs');
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

app.use(function (req, res, next) {
  req.mysql = pool;
  next();
})

/*
    Your middlewares or setups usually around here
*/
//API Router
var router = express.Router();// calling the outside routes
var tramite = require('./public/entidades/TramiteDB').router;
var bien = require('./public/entidades/BienDB').router;
var notificacion = require('./public/entidades/NotificacionDB').router;
var log = require('./public/entidades/loginDB').router;
var responsable = require('./public/entidades/ResponsableDB').router;
var area = require('./public/entidades/AreaDB').router;

var sesion;
router.get('/',function(req,res){
    sesion = req.session;
  if(sesion.tipo == 3){
    res.render('bienes',{id:sesion.id_responsable,user:sesion.user, tipoUsuario:sesion.tipo,title:"Bienes", data:[]});
  }else
    if(sesion.user){
      res.render('index',{user:sesion.user, tipoUsuario:sesion.tipo,title: "Inicio", data:[]})
    }else{
      res.render('login', {title:"Ingreso"})
    }
});
router.get('/about',function(req,res){
    res.send("This is About page");
});

/*router.get('/bajas',function(req,res){
    res.render('BajaDeBien',{title:"Baja", data:[]});
});*/

router.get('/transferencias',function(req,res){
    sesion = req.session;
    if(sesion.user){
      res.render('transferencias',{user:sesion.user, tipoUsuario:sesion.tipo,title:"Solicitud de transferencia", data:[]});
    }else{
      res.render('login', {title:"Ingreso"})
    }
});

router.get('/donaciones',function(req,res){
  sesion = req.session;
  if(sesion.user){
    res.render('donaciones',{user:sesion.user, tipoUsuario:sesion.tipo,title:"Solicitud de donación", data:[]});
  }else{
    res.render('login', {title:"Ingreso"})
  }
});

router.get('/peticiones',function(req,res){
  sesion = req.session;
  if(sesion.user){
    res.render('peticiones',{user:sesion.user, tipoUsuario:sesion.tipo,title:"Solicitud de petición", data:[]});
  }else{
    res.render('login', {title:"Ingreso"})
  }
});

router.get('/bajas',function(req,res){
  sesion = req.session;
  if(sesion.user){
    res.render('bajas',{user:sesion.user, tipoUsuario:sesion.tipo,title:"Solicitud de baja", data:[]});
  }else{
    res.render('login', {title:"Ingreso"})
  }
});

router.get('/login',function(req,res){
    if(sesion.user){
      req.session.destroy();
    }
    res.render('login',{title:"Ingreso", data:[]});
});

router.get('/bienes', function(req, res){
  sesion = req.session;
  if(sesion.user){
    res.render('bienes',{id:sesion.id_responsable,user:sesion.user, tipoUsuario:sesion.tipo,title:"Bienes", data:[]});
  }else{
    res.render('login', {title:"Ingreso"})
  }
});

router.get('/notificaciones',function(req,res){
  sesion = req.session;
  if(sesion.user){
    res.render('notificaciones',{user:sesion.user, tipoUsuario:sesion.tipo,title:"Notificaciones", data:[]});
  }else{
    res.render('login', {title:"Ingreso"})
  }
});

app.use('/',router);
app.use('/',tramite);
app.use('/',notificacion);
app.use('/',bien);
app.use('/',log);
app.use('/',responsable);
app.use('/',area);

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);
});
