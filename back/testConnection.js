const { sql, poolConnect } = require('./src/config/db');

(async () => {
    try {
        await poolConnect;
        const result = await sql.query`SELECT 1 AS resultado`;
        console.log('Conexión exitosa:', result.recordset);
    } catch (err) {
        console.error('Error al conectar:', err);
    }
})();
