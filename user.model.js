const mongoose = require('mongoose')
const Address = require('./address.model').schema

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    birthdate: {type: Date, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: { type: String, required: true},
    address: {type: Address, required: false}
});

module.exports = mongoose.model('User', userSchema)

