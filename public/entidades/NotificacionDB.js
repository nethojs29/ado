var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');
var router = express.Router();
const AUXILIAR = 2;
const JEFE = 1;
const RESPONSABLE = 3;

    app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
    app.use(bodyParser.json());
    app.use(expressValidator());

/*RESTful API Router*/
var api = router.route('/api/Notificaciones');
var api2 = router.route('/api/Notificacion/:id_notificacion')
//middleware api
api.all(function(req,res,next){

    /*Do stuffs here when a call to api route invoked*/
    console.log(req.method,req.url);
    next();
});

api.get(function(req,res){
    var usuario = req.session.user;
    req.mysql.getConnection(function(err, conn) {

      if (err) return next("No se pudo conectar a la base de datos.");
      if(usuario != "JefeDepartamento") var str = "SELECT * from Notificacion WHERE destinatario = "+req.session.tipo;
      else var str = "SELECT Tramite.motivo,Notificacion.emisor,Notificacion.id_notificacion,Notificacion.mensaje,Tramite.id_tramite,Tramite.fecha_creacion,Tramite.tipo,Tramite.motivo,Notificacion.destinatario FROM Notificacion INNER JOIN Tramite ON Notificacion.id_tramite = Tramite.id_tramite AND Notificacion.destinatario = "+req.session.tipo;
      var query = conn.query(str,function(err,rows){
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

api.post(function(req,res,next){

    var data = {
        id_tramite: req.body.id_tramite,
        tipo: req.body.tipo,
        bien: req.body.bien,
        emisor: req.body.emisor,
        mensaje: req.body.mensaje,
        destinatario: req.body.destinatario,
        fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' ')
     };

    //inserting into mysql
    req.mysql.getConnection(function (err, conn){

        if (err) return next("No se pudo conectar a la base de datos.");

        var query = conn.query("INSERT INTO Notificacion set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }
           conn.release();
          res.sendStatus(200);

        });

     });

});

api2.get(function(req, res){
  var id_tramite = req.params.id_tramite;

  req.mysql.getConnection(function(err, conn) {

    if (err) return next("No se pudo conectar a la base de datos.");

    var query = conn.query('SELECT * FROM Notificacion WHERE id_notificacion = ?',[id_tramite],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          conn.release();
          res.render('edit',{title:"Bien",data:rows});
       });
  });
});

api2.delete(function(req, res) {
  var id_notificacion = req.param('id_notificacion');
  console.log(id_notificacion[1]);

  req.mysql.getConnection(function(err, conn) {

    if (err) return next("No se pudo conectar a la base de datos.");

    var query = conn.query('DELETE FROM Notificacion WHERE id_notificacion = ?',[id_notificacion[1]],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          conn.release();
          res.send(true);
       });
  });
})

module.exports.router = router;
