var mongo = require('mongodb').MongoClient;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

process.env.MONGO_URL = 'mongodb://localhost/growlerdar_test';
require(__dirname + '/../app.js');

var Bev = require(__dirname + '/../models/Beverage');

describe('beverages', function() {
  var db, token;
  before(function(done) {
    mongo.connect('mongodb://localhost/growlerdar_test', function(err, dbConn) {
      db = dbConn;
      done();
    });
  });

  before(function(done) {
    chai.request('localhost:4000')
      .post('/api/users')
      .send({email: 'test@example.com', username: 'test', password: 'foobar123'})
      .end(function(err, res) {
        if (err) throw err;
        token = res.body.token; 
        done();
      })
  });

  after(function(done) {
    db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to get an index', function(done) {
    chai.request('localhost:4000')
    .get('/api/beverages')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should create new locations', function(done) {
    chai.request('localhost:4000')
      .post('/api/beverages')
      .send({name: 'a test beer', auth: token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('a test beer');
        done();
      });
  });

  describe('needs a resource in the db', function() {
    var testBev;
    before(function(done) {
      var bev = new Bev({name: 'test beverage'});
      bev.save(function(err, data) {
        if (err) throw err;
        testBev = data;
        done();
      });
    });

    it('should be able to get a single bev', function(done) {
      chai.request('localhost:4000')
        .get('/api/beverages/' + testBev._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          console.log(res.body);
          expect(res.body.name).to.eql('test beverage');
          done();
        });
    });

    it('should be able to update a bev', function(done) {
      chai.request('localhost:4000')
        .put('/api/beverages/' + testBev._id) 
        .send({name: 'some new name', auth: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should able to delete a bev', function(done) {
      chai.request('localhost:4000')
        .delete('/api/beverages/' + testBev._id)
        .send({auth: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });
});
