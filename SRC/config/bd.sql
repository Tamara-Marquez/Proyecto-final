create database Tienda;
use Tienda;

-- Creamos  las tablas para la tienda --


create table Rol (
id_rol SMALLINT NOT NULL PRIMARY KEY,
nombre_rol VARCHAR(20) NOT NULL UNIQUE
);

create table Usuarios (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(20) NOT NULL,
apellido VARCHAR(20) NOT NULL,
email VARCHAR (40) NOT NULL,
password  VARCHAR (200) NOT NULL,
id_rol SMALLINT NOT NULL,
FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
);


create table Categorias (
id_categoria SMALLINT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL
);

create table Productos (
id_producto INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
precio INT NOT NULL,
stock INT NOT NULL,
imagen VARCHAR(255),
id_categoria SMALLINT,
id_usuario INT,
FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
	ON UPDATE CASCADE ON DELETE SET NULL,
FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
	ON UPDATE CASCADE ON DELETE SET NULL
); 


create table ventas (
id_venta INT AUTO_INCREMENT PRIMARY KEY,
id_usuario INT,
fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
total DECIMAL(10,2) NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
	ON UPDATE CASCADE ON DELETE SET NULL
);

create table detalle_ventas (
id_detalle INT AUTO_INCREMENT PRIMARY KEY,
id_venta INT,
id_producto INT,
cantidad INT NOT NULL,
precio_unitario DECIMAL(10,2) NOT NULL,
FOREIGN KEY (id_venta) REFERENCES ventas(id_venta)
	ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
	ON UPDATE CASCADE ON DELETE CASCADE
);