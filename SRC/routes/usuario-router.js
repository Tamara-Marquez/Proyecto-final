/* Rutas de usuarios (/usuarios)
POST / → Crear usuario (registro)

GET / → Listar todos

GET /:id → Ver usuario por ID

PUT /:id → Editar usuario

DELETE /:id → Eliminar usuario*/ 


router.get ('/usuario');
router.get ('/usuario/:id');
router.post('/usuario');
router.put('/usuario/:id');
router.delete ('/usuario/id');