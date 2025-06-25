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
          l.id_logro as id,
          l.nombre as name,
          l.descripcion as description,
          l.icono as icon,
          ul.ganado as earned,
          ul.fecha_ganado as earnedDate,
          l.puntos as points
        FROM logros l
        LEFT JOIN usuario_logros ul ON l.id_logro = ul.id_logro AND ul.id_usuario = @userId
      `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener logros:', error);
    res.status(500).json({ error: 'Error al obtener logros' });
  }
});

module.exports = router;