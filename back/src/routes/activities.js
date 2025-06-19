const actividadesController = require('../controllers/activitiesController');
const authMiddleware = require('../middleware/authMiddleware'); // verifica JWT

// router.get('/recomendadas', authMiddleware, actividadesController.obtenerRecomendadas);


// back/src/routes/activities.js
const express = require('express');
const { pool } = require('../config/db');
const router = express.Router();

// GET /api/activities - Obtener todas las actividades
router.get('/', async (req, res) => {
    try {
        const result = await pool.request().query(`
            SELECT 
                id_actividad as id,
                nombre as name,
                (SELECT nombre FROM categorias WHERE id_categoria = a.id_categoria) as category,
                descripcion as description,
                instructions,
                video_url as videoUrl,
                duration,
                difficulty,
                points
            FROM actividades a
        `);
        console.log('Actividades obtenidas:', result.recordset);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Error al obtener actividades' });
    }
});

module.exports = router;