let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Edit Profile', function(){
  it('page doesnt error', function(){
    chai.request(server)
    .get('/profile/edit')
    .end(function(req, res){
      res.should.have.status(200)
    })
  })
})
