var mongo = require('mongodb').MongoClient;
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGO_URL = 'mongodb://localhost/growlerdar_test';
require(__dirname + '/../app.js');

describe('users', function() {
  var db, token;
  before(function(done) {
    mongo.connect('mongodb://localhost/growlerdar', function(err, dbConn) {
      db = dbConn;
      done();
    })
  });

  after(function(done) {
    db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new user', function(done) {
    chai.request('localhost:4000')
      .post('/api/users')
      .send({username: 'test', email: 'test@example.com', password: 'foobar123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.not.eql(null); 
        expect(typeof res.body.token).to.eql('string');
        done();
      });
  });

  it('should be able to sign in to user', function(done) {
    chai.request('localhost:4000')
      .get('/api/sign_in')
      .auth('test', 'foobar123')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.not.eql(null); 
        expect(typeof res.body.token).to.eql('string');
        done();
      });
  });
});
