const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
