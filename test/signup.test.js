let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
let User = require('../app/models/user')
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('signup', function(){
  it('Should render welcome text', function(done){
    chai.request(server)
    .get('/signup')
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.text).to.contain('Signup')
    })
    done()
  })

  it('form posts successfully and logs in', function(done){
    let user = new User ({
      email: 'test1@test.com',
      password: 'test'
    })
    chai.request(server)
    .post('/signup')
    .send(user)
    .end(function(err, res){
      res.should.have.status(200)
      expect(res.req.path).to.equal('/profile')
    })
    done()
  })
})
