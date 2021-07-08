import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import server from '../server';
import userInfo from './userInfo';
import itemInfo from './itemInfo';

chai.use(chaiHttp);
chai.should();

let request;
let adminToken;
let userToken;
let itemId;

/**
 * signup & signin endpoint test
 */
describe('Test signup & signin endpoints', () => {
  before(() => {
    request = chai.request(server).keepOpen();
  });
  it('Should signup an admin', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.adminSignup);
    res.status.should.be.equal(201);
    res.body.data.firstName.should.be.equal('Admin');
    res.body.data.lastName.should.be.equal('Owner');
    res.body.data.email.should.be.equal('admin@ecommerce.com');
    adminToken = res.body.data.token;
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

  // SIGNIN
  it('Should signin a user', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(userInfo.signin);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    userToken = res.body.data.token;
  });
  it('should fail if email is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.password);
    res.should.have.status(400);
  });
  it('should fail if password is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.email);
    res.should.have.status(400);
  });
  it('should fail if Email is invalid', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.email);
    res.should.have.status(400);
  });
  it('should fail if Password is invalid', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.invalidPassword);
    res.should.have.status(400);
    res.body.should.be.a('object');
  });
});

/**
 * Item endpoint
 */
describe('Test item endpoints Admin', () => {
  it('Should deny access without token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', '')
      .send(itemInfo.newItem);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('should create an item', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items/')
      .set('x-auth-token', adminToken)
      .send(itemInfo.newItem);
    res.status.should.be.equal(201);
    itemId = res.body.data.id;
  });
  it('Should fail if title is omitted', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', adminToken)
      .send(itemInfo.omitTitle);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"title" is required');
  });
  it('Should fail if description is omitted', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', adminToken)
      .send(itemInfo.omitDescription);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"description" is required');
  });
  it('Should fail if category is omitted', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', adminToken)
      .send(itemInfo.omitCategory);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"category" is required');
  });
  it('Should fail if price is omitted', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', adminToken)
      .send(itemInfo.omitPrice);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"price" is required');
  });
  it('Should view all items', async () => {
    const res = await chai.request(server)
      .get('/api/v1/items');
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
  });
  it('Should update an item', async () => {
    const res = await chai.request(server)
      .patch(`/api/v1/items/${itemId}`)
      .set('x-auth-token', adminToken)
      .send(itemInfo.updateItem);
    res.status.should.be.equal(200);
  });
});

describe('Test item endpoints User', () => {
  it('Should not allow user to create an item', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', userToken)
      .send(itemInfo.newItem);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should deny access without token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', '')
      .send(itemInfo.newItem);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should view all items', async () => {
    const res = await chai.request(server)
      .get('/api/v1/items');
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
  });
  it('Should fail to update an item', async () => {
    const res = await chai.request(server)
      .patch(`/api/v1/items/${itemId}`)
      .set('x-auth-token', userToken)
      .send(itemInfo.updateItem);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  after(() => {
    mongoose.connection.collection('users').drop();
    mongoose.connection.collection('items').drop();
  });
});
