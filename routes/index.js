const routerx = require('express-promise-router');
const categoriaRouter = require('./api/categoria');
const articuloRouter = require('./api/articulo');
const usuarioRouter = require('./api/usuario');

const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/categoria', categoriaRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;