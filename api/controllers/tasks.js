'use strict';

/*
    Controller for handling the tasks
*/
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

exports.index = (req, res) => {
    Task.find({owner: req.user.id}, (err, tasks) => {
        if(err){
            res.send(err);
        }
        else{
            let completed = [], pending = [];
            tasks.map((task) => {
                if (task.status === 'pending'){
                    pending.push(task);
                }
                else{
                    completed.push(task);
                }
            });
            res.render('tasks/index', {completed: completed, pending: pending});
        }
    });
};

exports.create = (req, res) => {
    if(!req.body || !req.body.name){
        req.flash('error', 'Un paramètre est manquant ...');
        return res.redirect('/tasks');
    }
    let new_task = new Task();
    new_task.name = req.body.name;
    new_task.owner = req.user.id;
    new_task.save((err, task) => {
        if(err){
            req.flash('error', 'Une erreur s\'est produite ...');
        }
        return res.redirect('/tasks');
    });
};


exports.update = (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, task) => {
        if(err){
            res.send(err);
        }
        else{
            res.json({message: "Task successfully updated !"});
        }
    });
};

exports.destroy = (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, task) => {
        if(err){
            res.send(err);
        }
        else{
            res.json({message: "Task successfully deleted !"});
        }
    });
};
