'use strict';

const tasks = require('../controllers/tasks');

module.exports = (router) => {

    router.route('/tasks')
        .get(tasks.index)
        .post(tasks.create);

    router.route('/task/:id')
        .put(tasks.update)
        .delete(tasks.destroy)

}
