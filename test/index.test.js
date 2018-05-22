let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()

chai.use(chaiHttp)

describe('index page', function(){
  it('shouldnt error', function(done){
    chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200)
    })
    done()
  })
})
