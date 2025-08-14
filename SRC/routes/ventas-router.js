/* Rutas de ventas (/ventas)
POST / → Crear venta + detalle

GET / → Listar ventas

GET /usuario/:id → Ventas de un usuario

GET /:id → Ver venta con sus detalles*/


router.get ('/ventas');
router.get ('/usuario/:id');
router.post('/venta');

