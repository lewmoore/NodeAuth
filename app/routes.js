module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('index')
  })

  app.get('/signup', function(req, res){
    res.render('signup', { message: req.flash('signupMessage') })
  })

  app.get('/login', function(req, res){
    res.render('login', { message: req.flash('loginMessage') })
  })

  app.get('/profile', function(req, res){
    res.render('profile')
  })

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
  }
}
