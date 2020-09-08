const mongoose = require('mongoose');
const { builtinModules } = require('module');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    number: {type: String, unique: true, required: true},
    passCode: {type: Number, min: [1000, 'passcode must be 4 digits'], max: [9999, 'passcode must be 4 digits'], required: true},
    gigs_attended: [String],
    transmission: {type: Boolean, default: false}
});

module.exports = personSchema;