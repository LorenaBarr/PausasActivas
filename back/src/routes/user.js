const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/categorias', authMiddleware, userController.setIntereses);

module.exports = router;
