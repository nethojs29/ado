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
var api = router.route('/api/Tramite');
var api2 = router.route('/api/Tramite/:id_tramite')
//middleware api
api.all(function(req,res,next){

    /*Do stuffs here when a call to api route invoked*/
    console.log(req.method,req.url);
    next();
});

api.get(function(req,res){

    req.mysql.getConnection(function(err, conn) {

      if (err) return next("No se pudo conectar a la base de datos.");

      var query = conn.query('select Bien.nombre, Bien.numeroContraloria, Bien.descripcion,Area.habitacion,Area.ubicacion, Tramite.id_area, Tramite.motivo, Tramite.estado,Tramite.tipo, Tramite.fecha_creacion, Tramite.id_tramite FROM Tramite INNER JOIN Area ON Tramite.id_tramite INNER JOIN Bien ON Tramite.id_area=Area.id_area INNER JOIN Tramite_has_Bien ON Tramite_has_Bien.id_tramite=Tramite.id_tramite AND Tramite_has_Bien.id_bien = Bien.id_bien;',function(err,rows){
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
    console.log(req.body.datos.bienes);
    var data = {
        id_area:req.body.datos.id_area,
        motivo:req.body.datos.motivo,
        tipo: req.body.datos.tipo,
        estado:req.body.datos.estado,
        fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' ')
     };

    //inserting into mysql
    req.mysql.getConnection(function (err, conn){

        if (err) return next("No se pudo conectar a la base de datos.");

        var query = conn.query("INSERT INTO Tramite set ? ",data, function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }
           var bns = req.body.datos.bienes;
           console.log("bienes", bns, bns.length);
           bns.forEach(function(bien) {               
            var sett = {
                id_tramite: rows.insertId,
                id_bien: bien.id_bien
            };
            var qry = conn.query("INSERT INTO Tramite_has_Bien set ? ",sett, function(err, rws) {
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }   
           }, this);
               
           });
          conn.release();
          //res.sendStatus(200);
          res.send({id:rows.insertId})

        });

     });

});

api2.get(function(req, res){
  var id_tramite = req.params.id_tramite;
  
  req.mysql.getConnection(function(err, conn) {

    if (err) return next("No se pudo conectar a la base de datos.");

    var query = conn.query('SELECT * FROM Tramite WHERE id_tramite = ?',[id_tramite],function(err,rows){
          if(err){
              console.log(err);
              return next("Mysql error, check your query");
          }
          res.send(rows)
       });
  });
});

api2.put(function(req, res, next){
    console.log("update tramite")
  var id_tramite = req.param('id_tramite')
  //id_tramite = id_tramite.slice(0,2);
  var newEstado = req.param('estado');
  console.log("id_tramite --",id_tramite);
  console.log(id_tramite.substring(1),newEstado);

   req.mysql.getConnection(function(err, conn) {

     if (err) return next("No se pudo conectar a la base de datos.");

     var query = conn.query("UPDATE Tramite set estado='"+newEstado+"' WHERE id_tramite = ? ",[id_tramite.substring(1)], function(err, rows) {
       if(err){
          console.log(err);
          return next("Mysql error, check your query");
       }

       res.sendStatus(200);

     })
   })
});

module.exports.router = router;
