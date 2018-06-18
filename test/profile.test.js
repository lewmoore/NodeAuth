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
      res.text.should.contain('Welcome to your profile page!')
      done()
    })
  })

  // it('should load firstname, surname and jobtitle when posting from edit', function(done){
  //   let userProfile = {
  //     firstname: 'Lewis', lastname: 'Moore', job: 'Developer'
  //   }
  //   AuthUser
  //   .post('/profile')
  //   .send(userProfile)
  //   .end(function(err, res){
  //     res.should.have.status(200)
  //     expect(res.text).to.contain('Name: Lewis Moore')
  //     done()
  //   })
  // })
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
