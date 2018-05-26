let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Login Page', function(){
  it('should not error', function(done){
    chai.request(server)
    .get('/login')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('Login')
    })
    done()
  })

  it('form posts successfully', function(done){
    let user = {
      email: 'test1@test.com',
      password: 'test'
    }
    chai.request(server)
    .post('/login')
    .send(user)
    .end(function(err, res){
      res.should.have.status(200)
    })
    done()
  })
})
