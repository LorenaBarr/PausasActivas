const { registrarUsuario, loginUsuario } = require('../services/authService');
const { signToken } = require('../utils/jwt');

const register = async (req, res) => {
    try {
        await registrarUsuario(req.body);
        res.status(201).json({ msg: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ msg: 'Error al registrar usuario', error: err });
    }
};

const login = async (req, res) => {
    try {
        const usuario = await loginUsuario(req.body.email, req.body.password);
        if (!usuario) return res.status(401).json({ msg: 'Credenciales inválidas' });

        const token = signToken({ id_usuario: usuario.id_usuario, email: usuario.email });
        res.json({ token, usuario });
    } catch (err) {
        res.status(500).json({ msg: 'Error en login', error: err });
    }
};

module.exports = { register, login };
