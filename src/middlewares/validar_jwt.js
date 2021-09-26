const jwt = require('jsonwebtoken');
const {response, request} = require('express');
const { Users } = require('../models/user.models')

const validar_jwt = (req = request, res = response, next) => {
    
    const token = req.header('x-token');

    // Verificar existencia del token
    if(!token){
        return res.status(401).json({
            msg: 'no existe el token'
        })
    }

    // Verificar token
    try {

        const { id } = jwt.verify(token,process.env.SECRET);

        if(id){
           return res.status(401).json({
            msg: 'no existe el id'
           }); 
        }

        // verificar existencia del id en la base de datos
        const user = Users.find( user => user.id === id  );

        // valida el usuario
        if(!user){
            return res.status(401).json({
                msg: 'no existe el usuario'
            })
        }

        req.user = user;

        next();

    }catch(error){
        throw error
    }
    
}

module.exports = { validar_jwt }