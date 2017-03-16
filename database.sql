DROP DATABASE IF EXISTS ADOO;
CREATE DATABASE ADOO;

USE ADOO;


CREATE TABLE IF NOT EXISTS `Usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `tipo` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Responsable` (
  `id_responsable` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_responsable`),
  CONSTRAINT FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Area` (
  `id_area` int(11) NOT NULL AUTO_INCREMENT,
  `id_responsable` int(11) NOT NULL,
  `clave` int(11) NOT NULL,
  `habitacion` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_area`),
  CONSTRAINT FOREIGN KEY (id_responsable) REFERENCES Responsable(id_responsable)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;

CREATE TABLE IF NOT EXISTS `Bien` (
  `id_bien` int(11) NOT NULL AUTO_INCREMENT,
  `id_area` int(11) NOT NULL,
  `numeroContraloria` varchar(100) NOT NULL,
  `numeroSerie` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `fecha_comprado` DATE NOT NULL,
  `forma_de_compra` varchar(100) NOT NULL,
  `costo` int(11) NOT NULL,
  `estado` varchar(100) NOT NULL,
  PRIMARY KEY (`id_bien`),
  CONSTRAINT FOREIGN KEY (id_area) REFERENCES Area(id_area)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Tramite` (
  `id_tramite` int(11) NOT NULL AUTO_INCREMENT,
  `id_area` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `motivo` varchar(250) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `fecha_creacion` DATE NOT NULL,
  `fecha_terminacion` DATE,
  PRIMARY KEY (`id_tramite`),
  CONSTRAINT FOREIGN KEY (id_area) REFERENCES Area(id_area)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
ALTER TABLE Tramite AUTO_INCREMENT = 100;

CREATE TABLE IF NOT EXISTS `Notificacion` (
  `id_notificacion` int(11) NOT NULL AUTO_INCREMENT,
  `emisor` varchar(100) NOT NULL,
  `id_tramite` int(11),
  `bien` varchar(100),
  `tipo` varchar(100) NOT NULL,
  `mensaje` varchar(100) NOT NULL,
  `destinatario` varchar(100) NOT NULL,
  `fecha_creacion` DATE NOT NULL,
  CONSTRAINT FOREIGN KEY (id_tramite) REFERENCES Tramite(id_tramite),
  PRIMARY KEY (`id_notificacion`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `Responsable_has_Area` (
  `id_responsable` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  CONSTRAINT FOREIGN KEY (id_area) REFERENCES Area(id_area),
  CONSTRAINT FOREIGN KEY (id_responsable) REFERENCES Responsable(id_responsable)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Tramite_has_Bien` (
  `id_tramite` int(11) NOT NULL,
  `id_bien` int(11) NOT NULL,
  CONSTRAINT FOREIGN KEY (id_bien) REFERENCES Bien(id_bien),
  CONSTRAINT FOREIGN KEY (id_tramite) REFERENCES Tramite(id_tramite)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

INSERT INTO Usuario (usuario,contrasena, tipo) VALUES ("Gabriela", "auxiliar",2);
INSERT INTO Usuario (usuario,contrasena, tipo) VALUES ("JefeDepartamento", "matematicas",1);
INSERT INTO Usuario (usuario,contrasena, tipo) VALUES ("Edelmira", "mexicali2016",3);
INSERT INTO Usuario (usuario,contrasena, tipo) VALUES ("edna2010", "edna123",2);
INSERT INTO Usuario (usuario,contrasena, tipo) VALUES ("bodega", "bodega",2);
INSERT INTO Usuario (usuario,contrasena, tipo) VALUES ("almacen", "almacen",2);
INSERT INTO Usuario (usuario,contrasena, tipo) VALUES ("Ernesto", "naranja",3);

INSERT INTO Responsable (nombre, id_usuario) VALUES
("Gerente Almacen",6),
("Gerente Bodega",5),
("Edelmira Rodriguez",3),
("",2),
("",1),
("",4),
("Ernesto",7);

INSERT INTO Area (id_responsable, clave,habitacion, ubicacion) VALUES
(1,"0","Almacen","Edificio 1A"),
(2,"-1","Bodega","Edificio 1B"),
(1,"112" ,"cubiculo 6 modulo 9", "Edificio 3K-4"),
(1,"124", "laboratorio ingenieria de software", "Edificio 3K-4"),
(2, "130","cubiculo 3 modulo 8", "Edificio 3K-4"),
(3,"158","cubiculo 6 segundo piso", "Edificio 3K-4"),
(3,"159","cubiculo 7 segundo piso", "Edificio 3K-4"),
(7,"112","cubiculo 2 primer piso", "Edificio 3K-4");


INSERT INTO Bien (id_area,numeroContraloria,numeroSerie,nombre, descripcion, fecha_comprado, forma_de_compra, costo, estado) VALUES
(6,"3154014767","0804502645","Computadora FYNU7C104549U","marca Lanix modelo TITAN 4020 procesador core 2 duo E6750 velocidad interna a 2.66 GHzm memoria ram 2 GB, Disco duro de 250gb, unidad optica DVD RW 16X8X16X6X8X4X/16X+48X24X48X, T. de red 10/100/1000, Windows Vista home basic, monitor LCD modelo de 17TFT", "2014-02-20", "ordinario", 9000, "Activo"),
(6,"3154014780","2V72541","Sistema de respaldo","cinta magnetica marca Dell modelo Powervault 100T", "2014-02-20","ordinario", 4000, "activo"),
(6,"3154010178","S/S","Librero","S/M Metalico con tres division de 0.88*0.038*0.90", "2014-02-20","ordinario", 4000, "activo"),
(6,"3154013717","S/S","Mesa","Marca massimo spassio, modelo MSCS-160, fabricado en madera aglomerado, terminado en melamina, color pera/gris con estructura tubular de 1.60*0.80*0.75m con lateral con 2 cajones y una gaveta de 0.90*0.60*0.75", "2014-02-20","ordinario", 4000, "activo"),
(6,"3154013728","060403116","No break","Marca vica, modelo SP605plus", "2014-02-20","ordinario", 4000, "activo"),
(1,"3154014853","CNC98691RQ","Impresora","Marca Hewlett Packard, modelo LaserJet 1522NF", "2014-02-20","ordinario", 4000, "activo"),
(1,"3154015820","S/S","Laptop","Marca Dell Inspiron 14R-5337, Memoria ram 6GB, disco duro 500GB, pantalla touch 14 pulgadas", "2014-02-20","ordinario", 4000, "Disponible"),
(8,"3154014854","027F8340","Proyector","Marca Sony color blanco 2000 lumens", "2014-04-22","ordinario", 4000, "activo"),
(8,"3154014855","2F728200","Laptop","HP Pavilion dv4-1414la 4GB Ram 250HDD", "2012-05-03","ordinario", 4000, "activo"),
(8,"3154014856","127FG126","Pizarrón","90x60cm de plumon", "2014-06-20","ordinario", 4000, "activo"),
(8,"3154014857","FH1278FH","Impresora","Marca Hewlett Packard, modelo LaserJet 1544NF", "2014-12-06","ordinario", 4000, "activo"),
(8,"3154014858","SG26FHW1","Escritorio","De Cristal en L con soportes metálicos'", "2014-10-20","ordinario", 4000, "activo");


/*INSERT INTO `t_user` (`user_id`, `name`, `email`, `password`) VALUES
(1, `Mas Banyar`, `banyar@yahoo.com', '23235645yghgf'),
(2, 'Mas Mapmup', 'mapmup@gmail.com', 'dncskdcndscsdcdsc'),
(4, 'Boronong', 'borononn@yahoo.com', '032bcsjdncsdjc3223'),
(5, 'Nadya Ek', 'nadya@yahoo.com', 'bonbon032932');*/
