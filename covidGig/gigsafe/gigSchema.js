const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gigSchema = new Schema({
    artist: String,
    date: Date,
    venue_name: String,
    venue_id: String,
    transmission_reported: {type: Boolean, default: false}
});

module.exports = gigSchema;