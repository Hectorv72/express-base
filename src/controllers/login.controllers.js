const { generar_jwt } = require('../helpers/generar_token');
const User = require('../models/user.models');
const controller = {}

controller.loginUser = async (req,res) =>{

    const {user, password} = req.body;
    const log_user = User.find({user,password});

    if(!log_user){
        res.status(401).json({
            msg: 'el usuario no existe'
        });
    }else{

        const { id } = log_user;
    
        const token = await generar_jwt(id);
    
        res.header('auth-token', token).json({
            error: null,
            data: {token}
        });

    }
}

module.exports = controller;