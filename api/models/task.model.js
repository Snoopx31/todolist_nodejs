'use strict';
const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    name: {
        type: String,
        Required: [true, 'Enter a task name !']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        Required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
