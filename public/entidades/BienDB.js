var express = require('express');
var router = express.Router();
app = express();

var connection  = require('express-myconnection'),
    mysql = require('mysql');

    var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ADOO'
    });

/*RESTful API Router*/
var api = router.route('/api/Bien');
var api2 = router.route('/api/Bien/:id_bien')
//middleware api
api.all(function(req,res,next){

    /*Do stuffs here when a call to api route invoked*/
    console.log(req.method,req.url);
    next();
});

api.get(function(req,res){

    pool.getConnection(function(err, conn) {
      var query = conn.query('SELECT * FROM Bien',function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.render('Bien',{title:"Lista de bienes",data:rows});
         });
    });
  });

api2.get(function(req, res){
  var id_bien = req.params.id_bien;

  pool.getConnection(function(err, conn) {
    var query = conn.query('SELECT * FROM Bien WHERE id_bien = ?',[id_bien],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          res.render('edit',{title:"Bien",data:rows});
       });
  });
});

api2.put(function(req, res, next){
  console.log("entre?");
  var id_bien = req.params.id_bien;

  //get data
  var data = {
      id_area:req.body.id_area,
      estado:req.body.estado
   };

   pool.getConnection(function(err, conn) {
     var query = conn.query("UPDATE Bien set ? WHERE id_bien = ? ",[data,id_bien], function(err, rows) {
       if(err){
          console.log(err);
          return next("Mysql error, check your query");
       }

       res.sendStatus(200);

     })
   })
});

module.exports.router = router;
