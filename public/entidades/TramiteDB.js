var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');
var router = express.Router();

var connection  = require('express-myconnection'),
    mysql = require('mysql');

    var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ADOO'
    });


    app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
    app.use(bodyParser.json());
    app.use(expressValidator());

/*RESTful API Router*/
var api = router.route('/api/Tramite');
var api2 = router.route('/api/Tramite/:id_tramite')
//middleware api
api.all(function(req,res,next){

    /*Do stuffs here when a call to api route invoked*/
    console.log(req.method,req.url);
    next();
});

api.get(function(req,res){

    pool.getConnection(function(err, conn) {

      if (err) return next("No se pudo conectar a la base de datos.");

      var query = conn.query('SELECT * FROM Tramite',function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.render('Tramites',{title:"Tramites",data:rows});
         });
    });
  });

api.post(function(req,res,next){

    var data = {
        id_bien:req.body.id_bien,
        tipo: req.body.tipo,
        estado:"activo",
        fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' ')
     };

    //inserting into mysql
    pool.getConnection(function (err, conn){

        if (err) return next("No se pudo conectar a la base de datos.");

        var query = conn.query("INSERT INTO Tramite set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.sendStatus(200);

        });

     });

});

api2.get(function(req, res){
  var id_tramite = req.params.id_tramite;

  pool.getConnection(function(err, conn) {

    if (err) return next("No se pudo conectar a la base de datos.");

    var query = conn.query('SELECT * FROM Tramite WHERE id_tramite = ?',[id_tramite],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          res.render('edit',{title:"Bien",data:rows});
       });
  });
});

api2.put(function(req, res, next){
  var id_tramite = req.params.id_tramite;

  //get data
  var data = {
      id_area:req.body.id_area,
      estado:req.body.estado
   };

   pool.getConnection(function(err, conn) {

     if (err) return next("No se pudo conectar a la base de datos.");

     var query = conn.query("UPDATE Tramite set ? WHERE id_tramite = ? ",[data,id_tramite], function(err, rows) {
       if(err){
          console.log(err);
          return next("Mysql error, check your query");
       }

       res.sendStatus(200);

     })
   })
});

module.exports.router = router;
