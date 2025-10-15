DROP DATABASE Tienda;
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
'Un hatchback confiable y ágil, equipado con motor 1.6 litros y bajo consumo de combustible. Ideal para el uso diario gracias a su mantenimiento económico y su excelente maniobrabilidad. Diseño clásico, interior funcional y rendimiento equilibrado lo convierten en una opción sólida para quienes buscan practicidad y durabilidad.',
 1,
 5,
'https://resizer.glanacion.com/resizer/v2/desde-1991-cuando-se-lanzo-su-primera-generacion-W3ROWBMPXRB3DMDV6X4TK6VRME.jpg?auth=47d968b72f92c5f885643133749c74a6607e2fcfe69c2bb06a76e2e4385b039c&width=768&quality=70&smart=false'
),

(   'Volkswagen', 
    'Polo',
    2021, 
    8200000, 
    'Sedán compacto moderno con motor 1.6 MSI, reconocido por su suavidad de conducción y eficiencia. Presenta un interior bien insonorizado, amplio espacio trasero y tecnología de seguridad destacada. Perfecto para quienes buscan un vehículo urbano con prestaciones de nivel superior.', 
    1,
    3,
   'https://hips.hearstapps.com/hmg-prod/images/volkswagen-polo-2021-frontal-02-1618931695.jpg'
),

(   'Volkswagen', 
    'Virtus', 
    2020, 
    9500000, 
    'Sedán de gran confort y robustez estructural, derivado del Polo pero con mayor espacio interior. Su motor 1.6 MSI ofrece un andar equilibrado y eficiente, mientras que el diseño sobrio y elegante resalta el estilo característico de Volkswagen. Seguridad y confort combinados en un solo vehículo.', 
    1,
    2,
    'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_b1d955afec114104ac572accdd250aa2.webp'
),

(   'Volkswagen', 
    'Amarok', 
    2019, 
    13500000, 
    'Pick-up doble cabina 2.0 TDI 4x4, sinónimo de potencia, solidez y confort. Ideal tanto para el trabajo pesado como para el uso recreativo. Ofrece excelente desempeño off-road, gran capacidad de carga y un interior refinado con tecnología al servicio del conductor.', 
    1,
    2,
    'https://hauswagen.com.ar/wp-content/uploads/2024/12/H4sIAAAAAAAA_y2Uu87dRBCATxKFIIogQAjRo19IkZhd310coSR0CJQChSLFr1nvxf69Xtt7sc9xxQPlIXgPmrwAFQ0NEnOkSJY-removebg-preview.png'
),

(   'Volkswagen', 
    'T-Cross', 
    2022, 
    15500000, 
    'SUV compacto que combina diseño moderno, equipamiento tecnológico y eficiencia. Su motor 1.6 ofrece un rendimiento confiable, mientras que su altura y confort interior brindan una experiencia de conducción segura y versátil. Ideal para familias modernas que buscan estilo y funcionalidad.', 
    1,
    3,
    'https://acroadtrip.blob.core.windows.net/catalogo-imagenes/xl/RT_V_919ce2d849984b2b8641f038f2a619b5.webp'
);

-- AUTOS FIAT
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria,cantidad, image)
VALUES
(   'Fiat', 
    'Cronos', 
    2022, 
    9200000, 
    'El sedán argentino más vendido, reconocido por su confiabilidad, bajo costo de mantenimiento y diseño atractivo. Motor 1.3 o 1.8 según versión, con gran eficiencia en ciudad. Interior cómodo, amplio baúl y conectividad moderna lo convierten en la mejor opción dentro de su segmento.', 
    1,
    3,
    'https://www.deruedas.com.ar/images/vehiculos/9592_im.jpg'
),

(   'Fiat', 
    'Argo', 
    2021, 
    8700000, 
    'Hatchback moderno, con excelente relación precio-calidad. Su motor eficiente, diseño juvenil y amplio equipamiento de confort lo hacen ideal para el uso urbano. Presenta buena estabilidad y una estética atractiva que refleja el nuevo ADN de Fiat.', 
    1,
    4,
    'https://cloudfront-us-east-1.images.arcpublishing.com/artear/JDT544U5FBAS7CIRC7ZCAYABLY.jpg'
),

(   'Fiat', 
    'Toro', 
    2020,   
    14000000, 
    'Pick-up intermedia que combina robustez y confort de SUV. Ideal para ciudad y campo, ofrece una conducción suave, diseño imponente y gran capacidad de carga. Su interior de calidad y su comportamiento dinámico marcan la diferencia en su categoría.', 
    1,
    3,
   'https://cdn.motor1.com/images/mgl/be9m6/s1/nueva-fiat-toro-2022-fotos-datos-y-video-del-restyling-de-la-pick-up-compacta.webp'
),

(   'Fiat', 
    '500X', 
    2019, 
    12500000, 
    'SUV compacto de estilo retro y elegante. Equipado con tecnología avanzada, materiales de alta calidad y un motor ágil que asegura placer de conducción. Perfecto para quienes buscan distinción, confort y diseño italiano.', 
    1,
    2,
    'https://www.motoryracing.com/images/noticias/portada/24000/24954-n.jpg'
),

(   'Fiat', 
    'Punto',
    2017,
    6800000,
    'Hatchback confiable, con excelente rendimiento y bajo consumo. Diseño juvenil y aerodinámico, interior cómodo y mantenimiento económico. Una opción equilibrada entre practicidad y placer de conducción.', 
    1,
    3,
    'https://i0.wp.com/tiempomotor.com/wp-content/uploads/2016/06/fiat_punto_2017_2_0.jpg?fit=960%2C640&ssl=1&,resize=1280%2C720'
);

-- MOTOS HONDA
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria,cantidad, image)
VALUES
(   'Honda', 
    'CBR 500R', 
    2021, 
    9500000,
    'Motocicleta deportiva de media cilindrada con diseño aerodinámico y espíritu racing. Su motor bicilíndrico de 471 cc ofrece una respuesta potente y suave. Ideal para quienes buscan una moto deportiva equilibrada, confortable y apta tanto para ciudad como para ruta.', 
    2,
    4,
   'https://www.honda.es/content/dam/central/motorcycles/colour-picker/supersports/cbr500r/cbr500r_2024/nh-436m_mattegunpowderblackmetallic/24YM_CBR500R_Studio_MAT_GUNPOWDER_BLACK_METALLIC_RHS.png/jcr:content/renditions/m_r.png'
),

(   'Honda', 
    'XR 150L', 
    2020, 
    3800000, 
    'Enduro liviana y versátil, perfecta para desplazamientos urbanos y aventuras fuera de camino. Motor 150 cc confiable, bajo consumo y excelente maniobrabilidad. Ideal para quienes valoran durabilidad y rendimiento en todo terreno.', 
    2,
    3,
    'https://motos.fussetti.com/wp-content/uploads/2020/06/1447.1677188177.png'
),

(   'Honda', 
    'CB Twister 250', 
    2022, 
    4800000, 
    'Naked moderna, con motor de 250 cc, gran desempeño y estética agresiva. Perfecta para uso diario, ofrece comodidad, economía y una posición de manejo ergonómica. Honda combina confiabilidad y estilo en este modelo icónico.', 
    2,
    4,
    'https://corrientesmotos.com.ar/wp-content/uploads/2020/05/03B48229-E632-44ED-A386-AFCA3D3BF6DE-scaled.jpeg'
),

(   'Honda', 
    'Wave 110S', 
    2019, 
    2200000, 
    'Ciclomotor práctico, confiable y de bajo consumo. Ideal para movilidad urbana, con arranque eléctrico, transmisión semiautomática y excelente rendimiento de combustible. La compañera ideal para el día a día.', 
    2,
    5,
    'https://http2.mlstatic.com/D_787882-MLA81775417188_012025-C.jpg'
),

(   'Honda', 
    'Africa Twin 1100', 
    2021, 
    21500000, 
    'Motocicleta Adventure premium diseñada para viajes largos y terrenos exigentes. Su motor bicilíndrico de 1084 cc ofrece potencia y suavidad, con tecnología avanzada y confort superior. Destaca por su fiabilidad y desempeño en cualquier ruta.', 
    2,
    4,
    'https://www.moto1pro.com/sites/default/files/honda_crf-1000-l-africa_twin-2021.jpg'
);

-- MOTOS MOTOMEL
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria,cantidad,image)
VALUES
(   'Motomel', 
    'Sirius 190', 
    2022, 
    2500000, 
    'Street moderna y económica, con motor 190 cc y diseño deportivo. Ideal para uso urbano, ofrece un andar suave y buena respuesta. Su estética renovada y bajo costo de mantenimiento la vuelven una excelente opción para quienes buscan estilo y practicidad.', 
    2,
    3,
    'https://www.aszisa.com.ar/378-large_default/moto-motomel-sirius-190.jpg'
),

(   'Motomel', 
    'XMM 250', 
    2021, 
    3100000, 
    'Motocross nacional potente y accesible. Ideal para quienes desean iniciarse en el mundo off-road. Chasis resistente, buena suspensión y motor ágil que ofrece diversión y control en caminos exigentes', 
    2,
    1,
    'https://http2.mlstatic.com/D_NQ_NP_847256-MLA47919217489_102021-O.webp'
),

(   'Motomel', 
    'Blitz 110', 
    2020, 
    1700000, 
    'Moto urbana de entrada, práctica y económica. Motor de bajo consumo, arranque eléctrico y diseño compacto. Ideal para desplazamientos diarios con mantenimiento mínimo.', 
    2,
    3,
    'https://http2.mlstatic.com/D_724415-MLA77082433250_062024-C.jpg'
),

(   'Motomel', 
    'Skua 150', 
    2021, 
    2800000, 
    'Enduro versátil y accesible, perfecta para principiantes. Motor 150 cc confiable, diseño robusto y buena respuesta en caminos rurales o urbanos. Una excelente opción para quienes buscan aventura con bajo costo.', 
    2,
    2,
    'https://yuhmak.vtexassets.com/arquivos/ids/176297/M0011200846-2024--2-.png?v=638310071696070000'
),

(   'Motomel', 
    'CG 150', 
    2019, 
    2300000, 
    'Moto urbana de diseño clásico, destacada por su durabilidad y economía. Motor confiable de 150 cc, ideal para quienes buscan una moto sencilla, resistente y rendidora.', 
    2,
    2,
    'https://http2.mlstatic.com/D_730707-MLA43671836547_102020-C.jpg'
);

-- MOTOS ROUSER (Bajaj)
INSERT INTO Productos (marca, modelo, anio, precio, descripcion, id_categoria,cantidad,image)
VALUES
(   'Rouser', 
    'NS 200', 
    2022, 
    4200000, 
    'Naked deportiva de 200 cc con diseño agresivo y excelente relación peso-potencia. Ideal para quienes buscan rendimiento y estilo. Suspensión firme, frenos precisos y una estética que impone presencia en la ciudad.', 
    2,
    3,
   'https://www.arizonamotos.com.ar/Image/0/500_500-ns200_amarilla_detalle.jpg'
),

(   'Rouser', 
    'RS 200', 
    2021, 
    4600000, 
    'Deportiva carenada de 200 cc, con un diseño aerodinámico y gran desempeño. Perfecta para los amantes de la velocidad que no quieren renunciar al confort diario. Combina potencia, estabilidad y tecnología.', 
    2,
    1,
    'https://cetrogarmotos.com.ar/wp-content/uploads/mo0538.jpg'
),

(   'Rouser', 
    'NS 160', 
    2020, 
    3600000, 
    'Moto ligera y eficiente, con motor 160 cc de excelente respuesta. Ideal para uso urbano y trayectos medios. Su diseño moderno y bajo consumo la hacen una opción práctica y atractiva.', 
    2,
    3,
    'https://motos0km.com.ar/models/bajaj-rouser-ns-160-gallery-000000-020181012194138.jpg'
),

(   'Rouser', 
    'NS 125', 
    2019, 
    2800000, 
    'Motocicleta urbana básica con diseño deportivo. Ideal para conductores nuevos que buscan una moto ágil, económica y fácil de mantener. Su motor de 125 cc ofrece buena respuesta y eficiencia.', 
    2,
    1,
    'https://www.motozuni.com.ar/fotos/1675972615rouserns125_edit-14.jpg'
),

(   'Rouser', 
    'AS 200', 
    2018, 
    4000000, 
    'Adventure Sport versátil, ideal para rutas largas y caminos variados. Motor 200 cc con buena potencia, diseño aventurero y posición cómoda de manejo. Equilibrio perfecto entre turismo y deportividad.', 
    2,
    3,
    'https://motos0km.com.ar/models/bajaj-rouser-as-200-gallery-0000ff-120181103224218.jpg'
);

