const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user.model');
const { generarJWT } = require("../helpers/jwt");

const usuariosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

const getUsuarioByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });
    res.status(200).json({
        usuario
    });
}


const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Actualizado'
    })
}

const usuariosDelete = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Eliminado'
    });
}

const usuariosPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

const usuariosLogin = async (req, res) => {
    const { correo, password } = req.body;

    try{
        const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
        return res.status(400).json({
            msg: 'No encontrado'
        });
    }

    if(!usuario.estado){
        return res.status(400).json({
            msg: 'Usuario ya no existe'
        })
    }

    const passwordValido = bcryptjs.compareSync(password, usuario.password);

    if (!passwordValido) {
        return res.status(400).json({
            msg: 'La contraseña no es correcta'
        });
    }

    const token = await generarJWT(usuario.id)

    res.status(200).json({
        msg_1: 'Se inicio sesion',
        msg_2: 'Bienvenido ',
        msg_3: 'token'+ token,
    });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'No se pudo iniciar sesion'
        })
    }

}


module.exports = {
    usuariosDelete,
    usuariosPost,
    usuariosGet,
    getUsuarioByid,
    usuariosPut,
    usuariosLogin
}