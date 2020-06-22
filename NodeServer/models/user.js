const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('../startup/config');

const User = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    createAt: { type: String, default: Date.now() },
});

User.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

User.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

User.methods.generateJWT = () => {
    const refreshToken = jwt.sign({
        email: this.email,
        id: this._id,
    }, config.refreshTokenSecret,{expiresIn:config.refreshTokenLife});
    const token = jwt.sign({
        email: this.email,
        id: this._id,
    }, config.secret,{expiresIn: config.tokenLife})

    return { token, refreshToken }
}
User.plugin(uniqueValidator);
module.exports = mongoose.model('User', User);
