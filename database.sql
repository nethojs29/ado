DROP DATABASE IF EXISTS ADOO;
CREATE DATABASE ADOO;

USE ADOO;


CREATE TABLE IF NOT EXISTS `Usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Responsable` (
  `id_responsable` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_responsable`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Area` (
  `id_area` int(11) NOT NULL AUTO_INCREMENT,
  `id_responsable` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  PRIMARY KEY (`id_area`),
  CONSTRAINT FOREIGN KEY (id_responsable) REFERENCES Responsable(id_responsable)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 ;

CREATE TABLE IF NOT EXISTS `Bien` (
  `id_bien` int(11) NOT NULL AUTO_INCREMENT,
  `id_area` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha_comprado` DATE NOT NULL,
  `forma_de_compra` varchar(100) NOT NULL,
  `costo` int(11) NOT NULL,
  `estado` varchar(100) NOT NULL,
  PRIMARY KEY (`id_bien`),
  CONSTRAINT FOREIGN KEY (id_area) REFERENCES Area(id_area)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Tramite` (
  `id_tramite` int(11) NOT NULL AUTO_INCREMENT,
  `id_bien` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `fecha_creacion` DATE NOT NULL,
  PRIMARY KEY (`id_tramite`),
  CONSTRAINT FOREIGN KEY (id_bien) REFERENCES Bien(id_bien)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Notificacion` (
  `id_notificacion` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `mensaje` varchar(100) NOT NULL,
  `destinatario` varchar(100) NOT NULL,
  `fecha_creacion` DATE NOT NULL,
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
  CONSTRAINT FOREIGN KEY (id_tramite) REFERENCES Tramite(id_tramite),
  CONSTRAINT FOREIGN KEY (id_bien) REFERENCES Bien(id_bien)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

INSERT INTO Usuario (usuario,contrasena) VALUES ("Gabriela", "auxiliar");
INSERT INTO Usuario (usuario,contrasena) VALUES ("JefeDepartamento", "matematicas");
INSERT INTO Usuario (usuario,contrasena) VALUES ("AlbertoMireles", "IngSoft");

INSERT INTO Responsable (nombre) VALUES
("Alberto Mireles"),
("Juan Pablo Soto");

INSERT INTO Area (id_responsable, descripcion, ubicacion) VALUES
(1, "cubiculo 6 modulo 9", "Edificio 3K-4"),
(1, "laboratorio ingenieria de software", "Edificio 3K-4"),
(2, "cubiculo 3 modulo 8", "Edificio 3K-4");

INSERT INTO Bien (id_area, descripcion, fecha_comprado, forma_de_compra, costo, estado) VALUES
(1,"MacBook Pro 13 8GB RAM,256GB SSD", "2012-05-25", "ordinario", 25767, "bueno"),
(1,"Escritorio metalico color negro", "2012-02-11", "ordinario", 6000, "bueno"),
(1,"librero madera cubierta formaica cafe con puertas corredizas de cristal", "2014-01-17", "ordinario", 12500, "bueno"),
(1,"Telefono IP marca Avaya", "2014-01-25", "ordinario", 900, "bueno"),
(1,"Silla secretarial marca requiez", "2012-04-23", "ordinario", 800, "bueno"),
(2,"MacBook Pro 15 16GB RAM,512GB SSD", "2011-10-08", "ordinario", 32856, "bueno"),
(2,"Impresora HP Jet900", "2010-05-30", "ordinario", 1250, "bueno"),
(2,"Telefono IP marca Avaya", "2009-05-13", "ordinario", 900, "bueno"),
(2,"Librero metalico cubierta cristal negro", "2010-10-20", "ordinario", 1000, "bueno");



/*INSERT INTO `t_user` (`user_id`, `name`, `email`, `password`) VALUES
(1, `Mas Banyar`, `banyar@yahoo.com', '23235645yghgf'),
(2, 'Mas Mapmup', 'mapmup@gmail.com', 'dncskdcndscsdcdsc'),
(4, 'Boronong', 'borononn@yahoo.com', '032bcsjdncsdjc3223'),
(5, 'Nadya Ek', 'nadya@yahoo.com', 'bonbon032932');*/
