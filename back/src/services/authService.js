const { poolPromise, sql } = require('../config/db');
const bcrypt = require('bcryptjs');

async function registrarUsuario(data) {
    const pool = await poolPromise;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await pool.request()
        .input('nombre', sql.NVarChar, data.nombre)
        .input('apellido', sql.NVarChar, data.apellido)
        .input('email', sql.NVarChar, data.email)
        .input('compania', sql.NVarChar, data.compania)
        .input('pais', sql.NVarChar, data.pais)
        .input('password', sql.NVarChar, hashedPassword)
        .query(`
            INSERT INTO USUARIOS (nombre, apellido, email, compania, pais, password)
            VALUES (@nombre, @apellido, @email, @compania, @pais, @password)
        `);
}

async function loginUsuario(email, password) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('email', sql.NVarChar, email)
        .query(`SELECT * FROM USUARIOS WHERE email = @email`);

    const usuario = result.recordset[0];
    if (!usuario) return null;

    const validPassword = await bcrypt.compare(password, usuario.password);
    return validPassword ? usuario : null;
}

module.exports = { registrarUsuario, loginUsuario };
