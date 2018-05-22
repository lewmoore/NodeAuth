let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

chai.use(chaiHttp)

describe('signup page', function(){
  it('should render home page', function(done){
    chai.request(server)
    .get('/signup')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('This is the sign up page')
    })
    done()
  })
})
