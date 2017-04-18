'use strict';

/*
    Controller for handling the tasks
*/
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

exports.index = (req, res) => {
    Task.find((err, tasks) => {
        if(err){
            res.send(err);
        }
        else{
            res.render('tasks/index', {tasks : tasks});
        }
    });
};

exports.create = (req, res) => {
    let new_task = new Task(req.body);
    new_task.save((err, task) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(task);
        }
    });
};

exports.show = (req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(task);
        }
    });
};

exports.update = (req, res) => {
    Task.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, task) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(task);
        }
    });
};

exports.destroy = (req, res) => {
    Task.findOneAndRemove(req.params.id, (err) => {
        if(err){
            res.send(err);
        }
        else{
            res.json({message: "task deleted"});
        }
    });
};
