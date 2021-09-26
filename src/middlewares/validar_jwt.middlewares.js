const jwt = require('jsonwebtoken');
const {response, request} = require('express');
const User = require('../models/user.models')

const validar_jwt = async (req = request, res = response, next) => {
    
    const token = req.header('auth-token');

    // Verificar existencia del token
    if(!token){
        return res.status(401).json({
            msg: 'no existe el token'
        })
    }

    // Verificar token
    try {

        const { id } = jwt.verify(token,process.env.SECRET);

        if(!id){
           return res.status(401).json({
            msg: 'no existe el id'
           });
        }

        // verificar existencia del id en la base de datos
        const user = await User.findOne({id});
        

        // valida el usuario
        if(!user){
            return res.status(401).json({
                msg: 'no existe el usuario'
            })
        }

        req.user = user;
        console.log(user)
        console.log(user.rol)

        next();

    }catch(error){
        throw error
    }
    
}

module.exports = { validar_jwt }