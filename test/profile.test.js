let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Profile Page', function(){
  it('should successfully load profile page when logged in', function(done){
    chai.request(server)
    .get('/profile')
    .end(function(req, res){
      res.status.should.equal(200)
    })
    done()
  })
})
