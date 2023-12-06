const mongoose = require('mongoose');

const squadSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    characters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character' 
        }
    ],
    name: {
        type: String,
        required: true
    },
});

// custom validator to ensure there are at most 5 characters in the array
squadSchema.path('characters').validate(function (value) {
    return value.length <= 5;
}, 'Squad can have at most 5 characters.');

const Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;
