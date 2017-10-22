/*
    Controller for handling the tasks
*/
const mongoose = require('mongoose');

const Task = mongoose.model('Task');

exports.index = (req, res) => {
  Task.find({ owner: req.user.id }, (err, tasks) => {
    if (err) {
      res.send(err);
    } else {
      const completed = [];
      const pending = [];
      tasks.forEach((task) => {
        if (task.status === 'pending') {
          pending.push(task);
        } else {
          completed.push(task);
        }
      });
      res.render('tasks/index', { completed, pending });
    }
  });
};

exports.create = (req, res) => {
  if (!req.body || !req.body.name) {
    req.flash('error', 'Un paramètre est manquant ...');
    return res.redirect('/tasks');
  }
  const newTask = new Task();
  newTask.name = req.body.name;
  newTask.owner = req.user.id;
  return newTask.save((err) => {
    if (err) {
      req.flash('error', 'Une erreur s\'est produite ...');
    }
    return res.redirect('/tasks');
  });
};


exports.update = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Task successfully updated !' });
    }
  });
};

exports.destroy = (req, res) => {
  Task.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Task successfully deleted !' });
    }
  });
};
