import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose'
import server from '../server';
import userInfo from './userInfo';

chai.use(chaiHttp);
chai.should();

let request;

/**
 * signup endpoint test
 */
 describe('Test signup endpoints', () => {
  before(() => {
    request = chai.request(server).keepOpen();
  });
  it('Should signup a user', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signup);
    res.status.should.be.equal(201);
    res.body.data.firstName.should.be.equal('John');
    res.body.data.lastName.should.be.equal('Wick');
    res.body.data.email.should.be.equal('emmanuel@yahoo.com');
  });
  it('Should fail if email is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signupEmailOmitted);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"email" is not allowed to be empty');
  });
  it('Should fail if email is invalid', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.invalidEmail);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"email" must be a valid email');
  });
  it('Should fail if Email length is more than 50 characters', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.highEmailLength);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"email" length must be less than or equal to 50 characters long');
  });
  it('Should fail if firstName is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.omittedFirstName);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"firstName" is not allowed to be empty');
  });
  it('Should fail if firstName length is less than 2 characters', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.lowFirstNameLength);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"firstName" length must be at least 2 characters long');
  });
  it('Should fail if firstName length is more than 50 characters', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.highFirstNameLength);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"firstName" length must be less than or equal to 50 characters long');
  });
  it('Should fail if lastName is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.omittedLastName);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"lastName" is not allowed to be empty');
  });
  it('Should fail if lastName length is less than 2 characters', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.lowLastNameLength);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"lastName" length must be at least 2 characters long');
  });
  it('Should fail if lastName length is more than 50 characters', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.highLastNameLength);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"lastName" length must be less than or equal to 50 characters long');
  });
  it('Should fail if password is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.omittedPassword);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"password" is not allowed to be empty');
  });
  it('Should fail if password length is less than 6 characters', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.lowPasswordLength);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"password" length must be at least 6 characters long');
  });
  it('Should fail if password length is more than 50 characters', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.highPasswordLength);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"password" length must be less than or equal to 50 characters long');
  });
  after(() => {
    mongoose.connection.collection('users').drop()
  });
});
