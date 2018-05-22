let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

chai.use(chaiHttp)

describe('profile page', function(){
  it('should render profile page', function(done){
    chai.request(server)
    .get('/profile')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('This is the profile page')
    })
    done()
  })
})
