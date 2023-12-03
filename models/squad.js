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

const Squad = mongoose.model('Squad', squadSchema);

module.exports = Squad;
