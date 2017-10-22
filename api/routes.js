const tasksRoutes = require('./routes/tasks.route');
const usersRoutes = require('./routes/users.route');

module.exports = (router, passport) => {
  router.get('/', (req, res) => {
    res.render('index');
  });

  const auth = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect('/');
    } else {
      next();
    }
  };

  usersRoutes(router, passport);
  tasksRoutes(router, auth);
};
