

const tasks = require('../controllers/tasks');

module.exports = (router, auth) => {
  // Authentification is needed for those routes (all methods)
  router.all('/tasks', auth);
  router.all('/task/:id', auth);

  router.route('/tasks')
    .get(tasks.index)
    .post(tasks.create);

  router.route('/task/:id')
    .put(tasks.update)
    .delete(tasks.destroy);
};
