let Profile = require('./models/profile')

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index', { message: req.flash('notLoggedIn')})
  })

  app.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('signupMessage') })
  })

  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') })
  })

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { user: req.user.local })
  })

  app.get('/profile/edit', isLoggedIn, (req, res) => {
    res.render('editProfile')
  })

  app.get('/homepage', isLoggedIn, (req, res) => {
    res.render('homepage')
  })

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/homepage',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/homepage',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.post('/profile', (req, res) => {
    let newProfile = new Profile(req.body)
    newProfile.save((err, profile) => {
      if(err) {
        res.send(err)
      } else {
        console.log(req.body)
        res.render('profile')
      }
    })
  })

  app.get('/logout', (req, res) => {
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
