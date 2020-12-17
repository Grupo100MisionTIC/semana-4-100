const routerx = require('express-promise-router');
const userController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth');

const router = routerx();

router.post('/login', userController.login);

router.post('/register', auth.verificarAdministrador, userController.register)
router.get('/list', auth.verificarVendedor, userController.list);
router.put('/update', auth.verificarAdministrador, userController.update);


module.exports = router;