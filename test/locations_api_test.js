var mongo = require('mongodb').MongoClient;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
expect = chai.expect;

process.env.MONGO_URL = 'mongodb://localhost/growlerdar_test';
require(__dirname + '/../app.js');

describe('locations', function() {
  var db;
  before(function(done) {
    mongo.connect('mongodb://localhost/growlerdar_test', function(err, dbConn) {
      db = dbConn;
      done();
    });
  }.bind(this));
  after(function(done) {
    db.dropDatabase(function() {
      done();
    });
  });

  it('should respond to a get', function(done) {
    chai.request('localhost:4000')
      .get('/api/locations')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a new locations', function(done) {
    chai.request('localhost:4000')
    .post('/api/locations')
    .send({name: 'test name'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('test name');
      done();
    });
  });

  describe('needs a resource in the db', function() {
    var testLocation;
    before(function(done) {
      var conn = db.collection('locations');
      conn.insert({someVal: 'test val'}, function(err, result) {
        if (err) console.log(err);
        testLocation = result[0];
        done();
      });
    });

    it('should be able to get a single location', function(done) {
      chai.request('localhost:4000')
      .get('/api/locations/' + testLocation._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.someVal).to.eql('test val');
        done();
      });
    })

    it('should be able to delete', function(done) {
      chai.request('localhost:4000')
        .delete('/api/locations/' + testLocation._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });
});
