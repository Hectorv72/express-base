const User = require('../models/user.models');

const verificarRol = (req, res, next, roles = []) => {
    
    const { rol } = req.user;

    if(!roles.includes(rol)){
        return res.json({ msg: 'no tiene permiso para acceder aqui' })
    }
    next();
}

module.exports = { verificarRol }