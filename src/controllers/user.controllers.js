const User = require('../models/user.models');
const controller = {}


controller.getUsers = async (_req, res) => {
    const users = await User.find({active:true});
    
    res.json(users);
}


controller.getUser = async (req,res) => {

    const { id } = req.params;

    try{
        const user = await User.findOne({_id:id});
        res.json(user);

    }catch(error){
        res.json({
            msg: 'error al obtener usuario'
        });
    }
}


controller.createUser = async (req,res) => {
    const { email, username, password } = req.body;

    const user = new User({ email, username, password });
    await user.save();

    res.json({
        msg: 'usuario agregado',
        user
    })
}


controller.updateUser = async (req,res) => {

    const { id } = req.params;
    const { email, username, password, active } = req.body;
    const update = {}

    if(username){
        update.username = username;
    }

    if(email){
        update.email = email;
    }

    if(active){
        update.active = active;
    }

    // if(password){
    //     update.password = password;
    // }

    if(update.username || update.email || update.active){
        
        try {
            const user = await User.findByIdAndUpdate(id, update , { new: true});
            return res.json({ msg:'Datos de usuario actualizados', user});
        
        } catch (error) {
            res.status(401).json({ msg: "Error al actualizar usuario" });
        }

    }else{
        res.status(401).json({
            msg: 'no se enviaron datos'
        });
    }


    
}


controller.deleteUser = async (req,res) => {
    const { id } = req.params;

    try{
        const user = await User.findByIdAndUpdate(id, {active:false} , { new: true});

        res.json({
            msg: 'el usuario se elimino del sistema'
        });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar usuario" });
    }
    
}


module.exports = controller;