import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import server from '../server';
import userInfo from './userInfo';
import itemInfo from './itemInfo';

chai.use(chaiHttp);
chai.should();

describe('Test item endpoints Admin', () => {
  let adminToken;
  before(async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.adminSignin);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    adminToken = res.body.data.token;
  });
  it('Should fail if token is not admin token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', 'iihhhjjjkk')
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
  it('should create an item', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items/')
      .set('x-auth-token', adminToken)
      .send(itemInfo.newItem);
    res.status.should.be.equal(201);
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
});

describe('Test item endpoints User', () => {
  let userToken;
  before(async () => {
    const res = await chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(userInfo.signin);
    res.status.should.be.equal(200);
    res.body.data.firstName.should.be.equal('John');
    res.body.data.lastName.should.be.equal('Wick');
    res.body.data.email.should.be.equal('emmanuel@yahoo.com');
    userToken = res.body.data.token;
  });
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
  it('Should fail if token is not user token', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items')
      .set('x-auth-token', 'iihhhjjjkk')
      .send(itemInfo.newItem);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  after(() => {
    mongoose.connection.collection('users').drop();
    mongoose.connection.collection('items').drop();
  });
});
