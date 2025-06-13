const usuarioService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registrar = async (req, res) => {
    try {
        const { nombre, apellido, email, compania, pais, password } = req.body;

        const existente = await usuarioService.obtenerUsuarioPorEmail(email);
        if (existente) return res.status(400).json({ error: 'El email ya está registrado' });

        const nuevoUsuario = await usuarioService.registrarUsuario({ nombre, apellido, email, compania, pais, password });
        res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioService.obtenerUsuarioPorEmail(email);

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Generar JWT
        const token = jwt.sign({
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ token, usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

module.exports = {
    registrar,
    login
};
