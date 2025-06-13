const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');

// Registro y login
router.post('/register', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;
