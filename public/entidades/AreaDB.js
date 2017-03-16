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
var api = router.route('/api/area');
var api2 = router.route('/api/area/:id_area')
//middleware api
api.all(function(req,res,next){

    /*Do stuffs here when a call to api route invoked*/
    console.log(req.method,req.url);
    next();
});

api.get(function(req,res){
    var id_responsable = req.param('id_responsable');
    req.mysql.getConnection(function(err, conn) {

      if (err) return next("No se pudo conectar a la base de datos.");
      if(id_responsable){
        var query = conn.query('SELECT * FROM Area WHERE id_responsable = ?;',[id_responsable],function(err,rows){
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                //console.log(rows);
                conn.release();
                res.send({data:rows});
            });
      }else{
          var query = conn.query('SELECT * FROM Area;',function(err,rows){
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                //console.log(rows);
                conn.release();
                res.send({data:rows});
            });
      }
    });
  });


api2.get(function(req, res){
  var id_area = req.params.id_area;

  req.mysql.getConnection(function(err, conn) {

    if (err) return next("No se pudo conectar a la base de datos.");

    var query = conn.query('SELECT * FROM Area WHERE id_area = ?',[id_area],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          res.send(rows)
       });
  });
});

module.exports.router = router;
