

module.exports = (router, passport) => {
  router.get('/signup', (req, res) => {
    res.render('./users/signup');
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/tasks',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/tasks',
    failureRedirect: '/',
    failureFlash: true,
  }));

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
