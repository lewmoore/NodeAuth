let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Logout', function(){
  it('should redirect to index', function(){
    chai.request(server)
    .get('/logout')
    .end(function(err, res) {
      res.should.have.status(200)
      expect(res.req.path).to.equal('/')
    })
  })
})
