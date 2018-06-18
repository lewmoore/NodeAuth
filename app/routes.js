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
    res.render('profile', { user: req.user.local, profile: req.session })
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
    // Need to add link between Profile and User object to persist.
    // atm, its creating new Profile object everytime you post and not persisting
    let newProfile = new Profile(req.body)
    newProfile.save((err, profile) => {
      if(err) {
        res.send(err)
      } else {
        console.log(newProfile)
        res.render('profile', { profile: newProfile })
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
