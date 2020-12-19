const routerx = require('express-promise-router');
const userController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth');

const router = routerx();

router.post('/login', userController.login);

router.post('/add', auth.verificarAdministrador, userController.add)
router.get('/list', auth.verificarVendedor, userController.list);
router.put('/update', auth.verificarAdministrador, userController.update);
router.put('/activate', auth.verificarAdministrador, userController.activate);
router.put('/deactivate', auth.verificarAdministrador, userController.deactivate);

module.exports = router;