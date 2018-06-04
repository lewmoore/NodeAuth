module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('index', { message: req.flash('notLoggedIn')})
  })

  app.get('/signup', function(req, res){
    res.render('signup', { message: req.flash('signupMessage') })
  })

  app.get('/login', function(req, res){
    res.render('login', { message: req.flash('loginMessage') })
  })

  app.get('/profile', isLoggedIn, function(req, res){
    console.log(req.user.local)
    res.render('profile', { username: req.user.local.email})
  })

  app.get('/profile/edit', isLoggedIn, function(req, res){
    res.render('editProfile')
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

  function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  req.flash('notLoggedIn', 'You are not logged in')
  res.redirect('/');
  }
}
