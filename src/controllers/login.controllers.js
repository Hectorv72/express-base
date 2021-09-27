const { generar_jwt } = require('../helpers/generar_token');
const User = require('../models/user.models');
const bcryptjs = require('bcryptjs');
const controller = {}

controller.loginUser = async (req,res) =>{

    let {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        res.status(401).json({
            msg: 'el usuario no existe'
        });
    }else{

        bcryptjs.compare(password, user.password, async (err, data) => {
            if (data){
                const { id } = user;
        
                const token = await generar_jwt(id);
            
                res.header('auth-token', token).json({
                    error: null,
                    data: {token}
                });

            } else {
                return res.status(401).json({
                    msg: 'error al validar usuario'
                });
            }
        });

    }
}

module.exports = controller;