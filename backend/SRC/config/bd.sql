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
    cantidad SMALLINT,
    image VARCHAR(255),
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
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria, cantidad, image)
VALUES
(   'Volkswagen',
    'Gol Trend',
    2018,
    5500000,
    'Hatchback 1.6,
    económico y confiable', 
    1,
    5,
    "https://resizer.glanacion.com/resizer/v2/desde-1991-cuando-se-lanzo-su-primera-generacion-W3ROWBMPXRB3DMDV6X4TK6VRME.jpg?auth=47d968b72f92c5f885643133749c74a6607e2fcfe69c2bb06a76e2e4385b039c&width=768&quality=70&smart=false"
),

(   'Volkswagen', 
    'Polo',
    2021, 
    8200000, 
    'Sedán compacto, 
    motor 1.6 MSI', 
    1,
    3,
    "https://hips.hearstapps.com/hmg-prod/images/volkswagen-polo-2021-frontal-02-1618931695.jpg"
),

(   'Volkswagen', 
    'Virtus', 
    2020, 
    9500000, 
    'Sedán amplio, 
    buena seguridad', 
    1,
    2,
    "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_b1d955afec114104ac572accdd250aa2.webp"
),

(   'Volkswagen', 
    'Amarok', 
    2019, 
    13500000, 
    'Pick-up doble cabina 2.0 TDI 4x4', 
    1,
    2,
    "https://hauswagen.com.ar/wp-content/uploads/2024/12/H4sIAAAAAAAA_y2Uu87dRBCATxKFIIogQAjRo19IkZhd310coSR0CJQChSLFr1nvxf69Xtt7sc9xxQPlIXgPmrwAFQ0NEnOkSJY-removebg-preview.png"
),

(   'Volkswagen', 
    'T-Cross', 
    2022, 
    15500000, 
    'SUV compacto con tecnología moderna', 
    1,
    3,
    "https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_919ce2d849984b2b8641f038f2a619b5.webp"
);

-- AUTOS FIAT
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria, image)
VALUES
(   'Fiat', 
    'Cronos', 
    2022, 
    9200000, 
    'Sedán argentino más vendido', 
    1,
    3,
    "https://www.deruedas.com.ar/images/vehiculos/9592_im.jpg"
),

(   'Fiat', 
    'Argo', 
    2021, 
    8700000, 
    'Hatchback moderno y económico', 
    1,
    4,
    "https://cloudfront-us-east-1.images.arcpublishing.com/artear/JDT544U5FBAS7CIRC7ZCAYABLY.jpg"
),

(   'Fiat', 
    'Toro', 
    2020,   
    14000000, 
    'Pick-up intermedia, ideal ciudad y campo', 
    1,
    3,
    "https://cdn.motor1.com/images/mgl/be9m6/s1/nueva-fiat-toro-2022-fotos-datos-y-video-del-restyling-de-la-pick-up-compacta.webp"
),

(   'Fiat', 
    '500X', 
    2019, 
    12500000, 
    'Compacto retro, muy equipado', 
    1,
    2,
    "https://www.motoryracing.com/images/noticias/portada/24000/24954-n.jpg"
),

(   'Fiat', 
    'Punto',
    2017,
    6800000,
    'Hatchback confiable y económico', 
    1,
    3,
    "https://i0.wp.com/tiempomotor.com/wp-content/uploads/2016/06/fiat_punto_2017_2_0.jpg?fit=960%2C640&ssl=1&,resize=1280%2C720"
);

-- MOTOS HONDA
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria,cantidad, image)
VALUES
(   'Honda', 
    'CBR 500R', 
    2021, 
    9500000,
    'Deportiva de media cilindrada', 
    2,
    4,
    "https://www.honda.es/content/dam/central/motorcycles/colour-picker/supersports/cbr500r/cbr500r_2024/nh-436m_mattegunpowderblackmetallic/24YM_CBR500R_Studio_MAT_GUNPOWDER_BLACK_METALLIC_RHS.png/jcr:content/renditions/m_r.png"
),

(   'Honda', 
    'XR 150L', 
    2020, 
    3800000, 
    'Enduro liviana, ideal ciudad y campo', 
    2,
    3,
    "https://motos.fussetti.com/wp-content/uploads/2020/06/1447.1677188177.png"
),

(   'Honda', 
    'CB Twister 250', 
    2022, 
    4800000, 
    'Naked versátil de 250cc', 
    2,
    4,
    "https://corrientesmotos.com.ar/wp-content/uploads/2020/05/03B48229-E632-44ED-A386-AFCA3D3BF6DE-scaled.jpeg"
),

(   'Honda', 
    'Wave 110S', 
    2019, 
    2200000, 
    'Ciclomotor económico y confiable', 
    2,
    5,
    "https://http2.mlstatic.com/D_787882-MLA81775417188_012025-C.jpg"
),

(   'Honda', 
    'Africa Twin 1100', 
    2021, 
    21500000, 
    'Adventure touring premium', 
    2,
    4,
    "https://www.moto1pro.com/sites/default/files/honda_crf-1000-l-africa_twin-2021.jpg"
);

-- MOTOS MOTOMEL
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria,cantidad,image)
VALUES
(   'Motomel', 
    'Sirius 190', 
    2022, 
    2500000, 
    'Street económico y moderno', 
    2,
    3,
    "https://www.aszisa.com.ar/378-large_default/moto-motomel-sirius-190.jpg"
),

(   'Motomel', 
    'XMM 250', 
    2021, 
    3100000, 
    'Motocross nacional accesible', 
    2,
    1,
    "https://http2.mlstatic.com/D_NQ_NP_847256-MLA47919217489_102021-O.webp"
),

(   'Motomel', 
    'Blitz 110', 
    2020, 
    1700000, 
    'Moto básica de ciudad', 
    2,
    3,
    "https://http2.mlstatic.com/D_724415-MLA77082433250_062024-C.jpg"
),

(   'Motomel', 
    'Skua 150', 
    2021, 
    2800000, 
    'Enduro accesible para principiantes', 
    2,
    2,
    "https://yuhmak.vtexassets.com/arquivos/ids/176297/M0011200846-2024--2-.png?v=638310071696070000"
),

(   'Motomel', 
    'CG 150', 
    2019, 
    2300000, 
    'Moto urbana confiable', 
    2,
    2,
    "https://http2.mlstatic.com/D_730707-MLA43671836547_102020-C.jpg"
);

-- MOTOS ROUSER (Bajaj)
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria,cantidad,image)
VALUES
(   'Rouser', 
    'NS 200', 
    2022, 
    4200000, 
    'Naked deportiva de 200cc', 
    2,
    3,
    "https://www.arizonamotos.com.ar/Image/0/500_500-ns200_amarilla_detalle.jpg"
),

(   'Rouser', 
    'RS 200', 
    2021, 
    4600000, 
    'Deportiva carenada, 200cc', 
    2,
    1,
    "https://cetrogarmotos.com.ar/wp-content/uploads/mo0538.jpg"
),

(   'Rouser', 
    'NS 160', 
    2020, 
    3600000, 
    'Moto ligera y económica', 
    2,
    3,
    "https://motos0km.com.ar/models/bajaj-rouser-ns-160-gallery-000000-020181012194138.jpg"
),

(   'Rouser', 
    'NS 125', 
    2019, 
    2800000, 
    'Moto básica ideal ciudad', 
    2,
    1,
    "https://www.motozuni.com.ar/fotos/1675972615rouserns125_edit-14.jpg"
),

(   'Rouser', 
    'AS 200', 
    2018, 
    4000000, 
    'Adventure sport, versátil en rutas', 
    2,
    3,
    "https://motos0km.com.ar/models/bajaj-rouser-as-200-gallery-0000ff-120181103224218.jpg"
);