'use strict';
const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    name: {
        type: String,
        Required: 'Entrez le nom de la tâche.'
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
});

module.exports = mongoose.model('Task', taskSchema);
