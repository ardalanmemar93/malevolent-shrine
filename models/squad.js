const mongoose = require('mongoose');

const squadSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema', // Reference to the User model
        required: true
    },
    characters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'characterSchema' // Reference to the Character model
        }
    ],
    name: {
        type: String,
        required: true
    },
    // Add any other properties you need for your Squad model
});

// Add a custom validator to ensure there are at most 5 characters in the array
squadSchema.path('characters').validate(function (value) {
    return value.length <= 5;
}, 'Squad can have at most 5 characters.');

const Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;
