const {model, Schema} = require('mongoose');

const RolSchema = new Schema({
    rol: { type: String, required: true }
});

module.exports = model('Roles', RolSchema);