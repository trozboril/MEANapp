process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities');
var testSeed = require('../../src/server/models/seeds/test-seeds');
var Student = require('../../src/server/models/students');

chai.use(chaiHttp);


describe('student routes', function() {


  beforeEach(function (done) {
    //drop db
    testUtilities.dropDatabase();
    testSeed.runSeed(done);
  });

  afterEach(function (done) {
    //drop db
    testUtilities.dropDatabase(done);
  });

  describe('/GET students', function() {

    it('should return all students', function (done) {
      chai.request(server)
      .get('/students')
      .end(function (err, res) {
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.data.should.be.a('array');
        res.body.data.length.should.equal(1);
    

        res.body.data[0].firstName.should.equal('Kevin');
        res.body.data[0].lastName.should.equal('Schwartz');
        res.body.data[0].year.should.equal(2001);
        done();
      });
    });
  });

  describe('/GET students/:id', function() {

   it('should return a single student', function(done) { 
     Student.findOne(function(err, student){
       chai.request(server)
       .get('/students/'+ student._id)
         .end(function(err, res){
           res.status.should.equal(200);
           res.body.should.be.a('object');
           res.body.should.have.property('status');
           res.body.should.have.property('data');
           res.type.should.equal('application/json');
           res.body.data.should.be.a('object');
           res.body.status.should.equal('success');
           res.body.data.firstName.should.equal('Kevin');
           res.body.data.lastName.should.equal('Schwartz');
           res.body.data.year.should.equal(2001);
         done();
     }); 
    });
   });
 });


  describe('/POST students', function() {

   it('should post a single student', function(done) { 
     chai.request(server)
      .post('/students')
      .send({
        firstName: 'Tyler',
        lastName: 'Duglo',
        year: 1990
      })
      .end(function (err, res) {
        console.log(res);
        res.status.should.equal(200);
      });
     }); 
});

    

 //  describe('/DELETE students/:id', function() {

 //   it('should return a single student', function(done) { 
 //     Student.findOne(function(err, student){
 //       chai.request(server)
 //       .get('/students/'+ student._id)
 //         .end(function(err, res){
 //           res.status.should.equal(200);
 //           res.body.should.be.a('object');
 //           res.body.should.have.property('status');
 //           res.body.should.have.property('data');
 //           res.type.should.equal('application/json');
 //           res.body.data.should.be.a('object');
 //           res.body.status.should.equal('success');
 //           res.body.data.firstName.should.equal('Kevin');
 //           res.body.data.lastName.should.equal('Schwartz');
 //           res.body.data.year.should.equal(2001);
 //         done();
 //     }); 
 //    });
 //   });
 // });



  // describe('/POST students', function() {
  //   it('should add a new student', function (done){
      // chai.request(server)
      // .post('/students')
      // .send({
      //   firstName: 'Kevin',
      //   lastName: 'Bacon',
      //   year: 1956
      // })
  //     .end(function (err, res) {

  //     });
  //   });
  // });
});