const route     = require("express").Router;
const { Users } = require('../models/user.models');
const { validar_jwt } = require('../middlewares/validar_jwt');
const { generar_token } = require('../helpers/generar_token');


route.get('/',(req,res) => {
    const 
});

route.post('/login', async (req,res) => {
    const {user, password} = req.body;
    user = Users.find(element => element.user === user && element.password === password);

    // if(!user){
    //     res.status(401).json({
    //         msg: 
    //     })
    // }
});

route.put('/',(req,res) => {
    
});