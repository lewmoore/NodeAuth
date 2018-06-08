let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let expect = chai.expect
let should = chai.should()
process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Profile Page Auth', () => {
  let AuthUser = chai.request.agent(server)
  let user = {
    email: 'test1@test.com',
    password: 'test'
  }

  before((done) => {
    AuthUser
    .post('/login')
    .send(user)
    .end((err, res) => {
      done()
    })
  })

  it('should render welcome text', (done) => {
    AuthUser
    .get('/homepage')
    .end((err, res) => {
      res.should.have.status(200)
      res.text.should.contain('Welcome to GradCamp')
      done()
    })
  })
})
