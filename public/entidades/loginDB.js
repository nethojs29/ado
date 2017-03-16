var express = require('express');
var router = express.Router();
session = require('express-session');
app = express();

var api = router.route('/api/login');
var sesion;

api.all(function(req,res,next){

    /*Do stuffs here when a call to api route invoked*/
    console.log(req.method,req.url);
    next();
});

api.post(function(req, res, next) {
  sesion = req.session;
  var data = {
    usuario:req.body.usuario,
    pass:req.body.pass
  };
  console.log(data);

  req.mysql.getConnection(function(err,conn) {
    if (err) return next("No se pudo conectar a la base de datos.");
    console.log(data);
    var query = conn.query("SELECT Responsable.id_responsable, Usuario.tipo, Responsable.nombre FROM Responsable INNER JOIN Usuario ON Usuario.id_usuario = Responsable.id_usuario WHERE Usuario.usuario = '"+data.usuario+"' AND Usuario.contrasena = '"+data.pass+"';", function(err, rows){

       if(err){
            console.log(err);
            return next("Mysql error, check your query");
       }
      conn.release();
      //console.log(res);
      if(rows.length > 0){
        sesion.user = data.usuario;
        console.log(rows[0].id_responsable);
        sesion.id_responsable = rows[0].id_responsable;
        sesion.tipo = rows[0].tipo;
        res.send(true);
      }
      else res.send(false);

    });
  });
})

module.exports.router = router;
