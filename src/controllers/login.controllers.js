const { generar_jwt } = require('../helpers/generar_token');
const User = require('../models/user.models');
const controller = {}

controller.loginUser = async (req,res) =>{

    const {email, password} = req.body;
    const user = await User.findOne({email,password});
    console.log(user)

    if(!user){
        res.status(401).json({
            msg: 'el usuario no existe'
        });
    }else{

        const { id } = user;
    
        const token = await generar_jwt(id);
    
        res.header('auth-token', token).json({
            error: null,
            data: {token}
        });

    }
}

module.exports = controller;