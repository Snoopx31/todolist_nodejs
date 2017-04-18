'use strict';

const tasksRoutes = require('./routes/tasks.route')

module.exports = (router) => {
    tasksRoutes(router);
}
