const { poolConnect, pool, sql } = require('../config/db');
const bcrypt = require('bcrypt');

const registrarUsuario = async (usuario) => {
    await poolConnect;
    const hashedPassword = await bcrypt.hash(usuario.password, 10);

    const request = pool.request();
    request.input('nombre', sql.NVarChar(100), usuario.nombre);
    request.input('apellido', sql.NVarChar(100), usuario.apellido);
    request.input('email', sql.NVarChar(255), usuario.email);
    request.input('compania', sql.NVarChar(200), usuario.compania);
    request.input('pais', sql.NVarChar(100), usuario.pais);
    request.input('password', sql.NVarChar(255), hashedPassword);

    const result = await request.query(`
        INSERT INTO USUARIOS (nombre, apellido, email, compania, pais, password)
        OUTPUT INSERTED.*
        VALUES (@nombre, @apellido, @email, @compania, @pais, @password)
    `);

    return result.recordset[0];
};

const obtenerUsuarioPorEmail = async (email) => {
    await poolConnect;
    const request = pool.request();
    request.input('email', sql.NVarChar(255), email);

    const result = await request.query(`
        SELECT * FROM USUARIOS WHERE email = @email
    `);

    return result.recordset[0];
};

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorEmail
};
