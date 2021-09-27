const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email:    { type: String,  required: true },
    username: { type: String,  required: true },
    password: { type: String,  required: true },
    rol:      { type: String,  required: true },
    active:   { type: Boolean, default: true }
});

module.exports = model('User', UserSchema);