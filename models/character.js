const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: String,
    name_kanji: String,
    image: String,
    about: String,
    favorites: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Character', characterSchema);