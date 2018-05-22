let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

chai.use(chaiHttp)

describe('login page', function(){
  it('should display a log in form', function(){
    chai.request(server)
    .get('/login')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('Username:')
      expect(res.text).to.contain('Password:')
    })
  })
})
