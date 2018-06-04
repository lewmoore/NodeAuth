let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Edit Profile', function(){
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

  it('page doesnt error', function(done){
    chai.request(server)
    .get('/profile/edit')
    .end(function(req, res){
      res.should.have.status(200)
      done()
    })
  })

  it('should render a welcome message', function(){
    AuthUser
    .get('/profile/edit')
    .end(function(req, res){
      res.req.path.should.equal('/profile/edit')
      res.text.should.contain('Edit Profile Page')
    })
  })
})
