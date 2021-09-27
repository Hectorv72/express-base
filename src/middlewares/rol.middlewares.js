const User = require('../models/user.models');

const verificarRolIngreso = (req, res, next, roles = []) => {
    
    const { rol } = req.user;

    if(!roles.includes(rol)){
        return res.json({ 
            msg: 'No tiene permiso para acceder aqui'
        })
    }
    next();
}

module.exports = { verificarRolIngreso }