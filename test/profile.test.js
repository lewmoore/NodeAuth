let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Profile Page Auth', function(){
  let AuthUser = chai.request.agent(server)
  let user = {
    email: 'test1@test.com',
    password: 'test'
  }

  before(function(done){
    AuthUser
    .post('/login')
    .send(user)
    .end(function(err, res){
      done()
    })
  })

  it('should load successfully', function(done){
    AuthUser
    .get('/profile')
    .end(function(err, res){
      res.should.have.status(200)
      res.req.path.should.equal('/profile')
      res.text.should.contain('profile page')
      done()
    })
  })
})

describe('Profile Page No Auth', function(){
  it('redirects to index if not logged in', function(done){
    chai.request(server)
    .get('/profile')
    .end(function(err, res){
      res.should.have.status(200)
      res.req.path.should.equal('/')
      expect(res.text).to.contain('Login or Register with')
      done()
    })
  })
})
