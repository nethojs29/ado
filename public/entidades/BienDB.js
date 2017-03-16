var express = require('express');
var router = express.Router();
app = express();

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
    req.mysql.getConnection(function(err, conn) {
      //if(req.param('id_area')) console.log("ye"); else console.log("na");
      var tipoBusqueda = req.param('tipoBusqueda');
      var parametro = req.param('parametro')
      var str;
      if(tipoBusqueda == "area"){
        str = "SELECT Bien.id_bien, Bien.id_area, Bien.nombre, Bien.numeroContraloria,Bien.descripcion, Bien.numeroSerie FROM Bien WHERE id_area = "+parametro;
      }else if(tipoBusqueda == "numeroContraloria"){
        str = "SELECT Bien.id_bien, Bien.id_area, Bien.nombre, Bien.numeroContraloria,Bien.descripcion, Bien.numeroSerie FROM Bien WHERE numeroContraloria = "+parametro;
      } else if(tipoBusqueda == "numeroSerie"){
        str = "SELECT Bien.id_bien, Bien.id_area, Bien.nombre, Bien.numeroContraloria,Bien.numeroSerie,Bien.descripcion, Bien.numeroSerie FROM Bien WHERE numeroSerie = '"+parametro+"'";
      }
      
      //console.log(str);
      var query = conn.query(str,function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(rows);
            conn.release();
            if(rows.length > 0) res.send({data:rows});
            else res.send(false);

         });
    });
  });

api2.get(function(req, res){
  var id_bien = req.params.id_bien;

  req.mysql.getConnection(function(err, conn) {
    var query = conn.query('SELECT * FROM Bien WHERE id_bien = ?',[id_bien],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          conn.release();
          res.render('edit',{title:"Bien",data:rows});
       });
  });
});

api2.put(function(req, res, next){
  console.log("entre?");
  var id_tramite = req.param('id_tramite');
  console.log("tramite id",id_tramite);

   req.mysql.getConnection(function(err, conn) {
     var query = conn.query("SELECT Bien.id_bien,Tramite.tipo,Tramite.id_area FROM Tramite INNER JOIN Bien ON Tramite.id_bien = Bien.id_bien AND Tramite.id_tramite = ?;",[id_tramite], function(err, rows) {
       if(err){
          console.log(err);
          return next("Mysql error, check your query");
       }
       console.log("id_bien",rows[0].id_bien);
       if(rows[0].tipo == 'Baja'){
         var qry = conn.query("UPDATE Bien SET id_area = 2,estado = 'baja' WHERE id_bien = ?",[rows[0].id_bien], function(err, rows) {
           if(err){
              console.log(err);
              return next("Mysql error, check your query");
           }
         })
       }else if(rows[0].tipo == 'Transferencia'){
         var qry = conn.query("UPDATE Bien SET id_area = ? WHERE id_bien = "+rows[0].id_bien+"",[rows[0].id_area], function(err, rows) {
           if(err){
              console.log(err);
              return next("Mysql error, check your query");
           }
         })
       }else if(rows[0].tipo == 'Donacion'){
         var qry = conn.query("UPDATE Bien SET id_area = 1,estado = 'Disponible' WHERE id_bien = ?",[rows[0].id_bien], function(err, rows) {
           if(err){
              console.log(err);
              return next("Mysql error, check your query");
           }
         })
       }else if(rows[0].tipo == 'Peticion'){
         var qry = conn.query("UPDATE Bien SET id_area = ? WHERE id_bien = ?",[rows[0].id_area,rows[0].id_bien], function(err, rows) {
           if(err){
              console.log(err);
              return next("Mysql error, check your query");
           }
         })
       }
     })
   })
});

module.exports.router = router;
