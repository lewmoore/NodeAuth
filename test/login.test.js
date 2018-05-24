let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

describe('Login', function(){
  it('Should render welcome text', function(done){
    chai.request(server)
    .get('/login')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('Login Page')
    })
    done()
  })
})
