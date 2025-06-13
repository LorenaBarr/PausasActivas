const express = require('express');
const router = express.Router();
const actividadesController = require('../controllers/activitiesController');
const authMiddleware = require('../middleware/authMiddleware'); // verifica JWT

router.get('/recomendadas', authMiddleware, actividadesController.obtenerRecomendadas);

module.exports = router;