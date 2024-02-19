const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user.model');
const { generarJWT } = require("../helpers/jwt");

//Obtener todos los usaurios

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

//Select el usuario por medio del id

const getUsuarioByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({ _id: id });
    res.status(200).json({
        usuario
    });
}

//Actualizar

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario Actualizado'
    })
}

//Eliminar usuario

const usuariosDelete = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({
        msg: 'Usuario Eliminado'
    });
}

//Crear un usario nuevo

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

//Si unos de los parametros no puede es erroneo, mostrar la razon de porque no se puede registrar

const usuariosLogin = async (req, res) => {
    const { correo, password } = req.body;

    try{
        const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
        return res.status(400).json({
            msg: 'El usuario no existe'
        });
    }

    if(!usuario.estado){
        return res.status(400).json({
            msg: 'El usuario fue eliminado'
        })
    }

    const passwordValido = bcryptjs.compareSync(password, usuario.password);

    if (!passwordValido) {
        return res.status(400).json({
            msg: 'Intente de nuevo'
        });
    }

    //Creo token para despues mostrarlo al usuario al iniciar sesion
    const token = await generarJWT(usuario.id)

    res.status(200).json({
        msg_1: 'Inicio de sesion',
        msg_2: 'Inicio',
        msg_3: 'token'+ token,
    });

    //Si no se pudo solamente colocare error
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Error'
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