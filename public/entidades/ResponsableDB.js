var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');
var router = express.Router();

    app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
    app.use(bodyParser.json());
    app.use(expressValidator());

/*RESTful API Router*/
var api = router.route('/api/responsable');
var api2 = router.route('/api/Responsable/:id_responsable')
//middleware api
api.all(function(req,res,next){

    /*Do stuffs here when a call to api route invoked*/
    console.log(req.method,req.url);
    next();
});

api.get(function(req,res){

    req.mysql.getConnection(function(err, conn) {

      if (err) return next("No se pudo conectar a la base de datos.");

      var query = conn.query('SELECT * FROM Responsable;',function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            //console.log(rows);
            conn.release();
            res.send({data:rows});
         });
    });
  });


api2.get(function(req, res){
  var id_responsable = req.param('nombre');

  req.mysql.getConnection(function(err, conn) {

    if (err) return next("No se pudo conectar a la base de datos.");

    var query = conn.query('SELECT * FROM Responsable WHERE nombre = ?',[id_responsable],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          res.send(rows)
       });
  });
});

module.exports.router = router;
