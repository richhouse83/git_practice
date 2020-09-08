const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    name: {type: String, unique: true},
    capacity: Number,
    address: String,
    contact_number: String,
    shows_with_transmission: [String]
});

module.exports = venueSchema;