let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

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
})
