const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: String,
    nameKanji: String,
    imageUrl: String,
    about: String,
    favorites: Number,
    mal_id: Number, 
}, {
    timestamps: true
});

module.exports = mongoose.model('Character', characterSchema);
