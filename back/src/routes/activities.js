const actividadesController = require('../controllers/activitiesController');
const authMiddleware = require('../middleware/authMiddleware');

const express = require('express');
const { pool } = require('../config/db');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {     
        const { userId } = req.params;
        
        const result = await pool.request()
            .input('userId', userId)
            .query(`
                SELECT 
                    a.id_actividad as id,
                    a.nombre as name,
                    c.nombre as category,
                    a.descripcion as description,
                    a.instructions,
                    a.video_url as videoUrl,
                    a.duration,
                    a.difficulty,
                    a.points,
                    ua.completada,
                    ua.progreso
                FROM actividades a
                INNER JOIN usuario_actividades ua ON a.id_actividad = ua.id_actividad
                INNER JOIN categorias c ON a.id_categoria = c.id_categoria
                WHERE ua.id_usuario = @userId
            `);
        
        console.log('Actividades encontradas para usuario', userId, ':', result.recordset.length);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({ 
            error: 'Error al obtener actividades',
            details: error.message 
        });
    }
});

module.exports = router;