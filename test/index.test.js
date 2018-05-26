let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('index page', function(){
  it('should render home page', function(done){
    chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('Node Authentication')
    })
    done()
  })
})
