const { poolConnect, pool, sql } = require('../config/db');

const getActividadesRecomendadas = async (idUsuario) => {
    await poolConnect;
    const request = pool.request();
    request.input('idUsuario', sql.Int, idUsuario);

    const query = `
        SELECT TOP 3 A.id_actividad, A.nombre, A.descripcion, A.video_url, C.nombre AS categoria
        FROM USUARIO_CATEGORIAS UC
        INNER JOIN ACTIVIDADES A ON UC.id_categoria = A.id_categoria
        INNER JOIN CATEGORIAS C ON A.id_categoria = C.id_categoria
        WHERE UC.id_usuario = @idUsuario
        ORDER BY NEWID(); -- selección aleatoria
    `;

    const result = await request.query(query);
    return result.recordset;
};

module.exports = {
    getActividadesRecomendadas
};
