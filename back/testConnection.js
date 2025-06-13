// testConnection.js
const { poolConnect, pool } = require('./src/config/db');

async function testConnection() {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT GETDATE() AS fecha');
        console.log('Conexión exitosa:', result.recordset[0]);
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
    }
}

testConnection();
