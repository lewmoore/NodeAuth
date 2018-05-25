let User = require('./models/user')

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index')
  })

  app.get('/login', function(req, res){
    res.render('login')
  })

  app.get('/profile', function(req, res){
    res.render('profile')
  })

  app.post('/profile', function(req, res){
    let user = new User(req.body);
    user.save(function(err, user){
      if (err) {
        res.send(err)
      } else {
        res.render('profile')
      }
    })
  })
}
