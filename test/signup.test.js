let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

describe('signup', function(){
  it('Should render welcome text', function(done){
    chai.request(server)
    .get('/signup')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('Signup')
    })
    done()
  })

  it('form posts successfully', function(done){
    let user = {
      email: 'test1@test.com',
      password: 'test'
    }
    chai.request(server)
    .post('/signup')
    .send(user)
    .end(function(err, res){
      res.should.have.status(200)
    })
    done()
  })
})
