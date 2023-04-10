const { response,request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: validar id contra BD
    if (password) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} );

    res.json(usuario);
}

const usuariosPost = async(req, res = response) => {
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrado fisico de un registro
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json({
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}