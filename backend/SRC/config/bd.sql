drop database Tienda;
create database Tienda;
use Tienda;

-- Creamos  las tablas para la tienda --

create table rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR (40) NOT NULL
);

create table usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    email VARCHAR (40) NOT NULL,
    password  VARCHAR (200) NOT NULL,
    id_rol INT ,
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol)
    ON UPDATE CASCADE ON DELETE SET NULL
);


create table categorias (
    id_categoria SMALLINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

create table productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INT NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    estado ENUM('disponible','vendido') DEFAULT 'disponible',
    descripcion TEXT,
    imagen VARCHAR(255),
    id_categoria SMALLINT,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
    ON UPDATE CASCADE ON DELETE SET NULL
); 


CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_producto INT UNIQUE,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
        ON UPDATE CASCADE ON DELETE SET NULL
);



-- ROLES --


INSERT INTO Rol (id_rol, nombre_rol) VALUES
(1, 'Administrador'),
(2, 'Cliente');

-- USUARIOS--

INSERT INTO Usuarios (nombre, apellido, email, password, id_rol) VALUES
('Tamara', 'Marquez', 'tamaramarquez@gmail.com', '290521', 1),
('Hernan', 'Nahirñak', 'nahirñakhernan@gmail.com', '061097', 2),
('Maximiliano', 'Torres', 'maxitorres@gmail.com', 'maxi5886', 2),
('Javier', 'Ramirez', 'ramirezjavier@gmail.com', '5546ramirez', 2),
('Carlos', 'López', 'carloslopez@gmail.com', '84512151', 2);

-- CATEGORIAS--

INSERT INTO Categorias (nombre) VALUES
('auto'),
('moto');

-- PRODUCTOS --

-- AUTOS VOLKSWAGEN
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria)
VALUES
('Volkswagen', 'Gol Trend', 2018, 5500000, 'Hatchback 1.6, económico y confiable', 1),
('Volkswagen', 'Polo', 2021, 8200000, 'Sedán compacto, motor 1.6 MSI', 1),
('Volkswagen', 'Virtus', 2020, 9500000, 'Sedán amplio, buena seguridad', 1),
('Volkswagen', 'Amarok', 2019, 13500000, 'Pick-up doble cabina 2.0 TDI 4x4', 1),
('Volkswagen', 'T-Cross', 2022, 15500000, 'SUV compacto con tecnología moderna', 1);

-- AUTOS FIAT
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria)
VALUES
('Fiat', 'Cronos', 2022, 9200000, 'Sedán argentino más vendido', 1),
('Fiat', 'Argo', 2021, 8700000, 'Hatchback moderno y económico', 1),
('Fiat', 'Toro', 2020, 14000000, 'Pick-up intermedia, ideal ciudad y campo', 1),
('Fiat', '500', 2019, 12500000, 'Compacto retro, muy equipado', 1),
('Fiat', 'Punto', 2017, 6800000, 'Hatchback confiable y económico', 1);

-- MOTOS HONDA
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria)
VALUES
('Honda', 'CBR 500R', 2021, 9500000, 'Deportiva de media cilindrada', 2),
('Honda', 'XR 150L', 2020, 3800000, 'Enduro liviana, ideal ciudad y campo', 2),
('Honda', 'CB Twister 250', 2022, 4800000, 'Naked versátil de 250cc', 2),
('Honda', 'Wave 110S', 2019, 2200000, 'Ciclomotor económico y confiable', 2),
('Honda', 'Africa Twin 1100', 2021, 21500000, 'Adventure touring premium', 2);

-- MOTOS MOTOMEL
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria)
VALUES
('Motomel', 'Sirius 190', 2022, 2500000, 'Street económico y moderno', 2),
('Motomel', 'XMM 250', 2021, 3100000, 'Motocross nacional accesible', 2),
('Motomel', 'Blitz 110', 2020, 1700000, 'Moto básica de ciudad', 2),
('Motomel', 'Skua 150', 2021, 2800000, 'Enduro accesible para principiantes', 2),
('Motomel', 'CG 150', 2019, 2300000, 'Moto urbana confiable', 2);

-- MOTOS ROUSER (Bajaj)
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria)
VALUES
('Rouser', 'NS 200', 2022, 4200000, 'Naked deportiva de 200cc', 2),
('Rouser', 'RS 200', 2021, 4600000, 'Deportiva carenada, 200cc', 2),
('Rouser', 'NS 160', 2020, 3600000, 'Moto ligera y económica', 2),
('Rouser', 'NS 125', 2019, 2800000, 'Moto básica ideal ciudad', 2),
('Rouser', 'AS 200', 2018, 4000000, 'Adventure sport, versátil en rutas', 2);