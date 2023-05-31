const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    street: { type: String, required: true },
    neighbor: {type: String, required: true},
    postalCode: {type: String, required: true},
    state: {type: String, required: true},
    country: { type: String, required: true},
});

module.exports = mongoose.model('Address', userSchema)
