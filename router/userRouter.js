const express = require('express')
const {registerController,loginController,currentController,} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/register',registerController)
router.post('/login', loginController)
router.get('/current', validateToken,currentController)

module.exports = router;