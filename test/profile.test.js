let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

describe('Profile Page', function(){
  it('should successfully load profile page', function(done){
    chai.request(server)
    .get('/profile')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('This is the profile page')
    })
    done()
  })

  it('should post to profile', function(done){
    let user = {
      email: 'lewis@gmail.com',
      password: 'password'
    }
    chai.request(server)
    .post('/profile')
    .send(user)
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.body.email).to.equal('lewis@gmail.com')
    })
    done()
  })
})
