const actividadesService = require('../services/activitiesService');

const obtenerRecomendadas = async (req, res) => {
    try {
        const idUsuario = req.user.id_usuario; // asumimos que está autenticado
        const actividades = await actividadesService.getActividadesRecomendadas(idUsuario);
        res.status(200).json(actividades);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener actividades recomendadas' });
    }
};

module.exports = {
    obtenerRecomendadas
};
