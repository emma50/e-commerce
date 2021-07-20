import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import server from '../server';
import userInfo from './userInfo';
import itemInfo from './itemInfo';
import cartInfo from './cartInfo';

chai.use(chaiHttp);
chai.should();

let request;
let adminToken;
let userToken;
let userToken2;
let itemId;
let itemId2;

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
    // adminToken = res.body.data.token;
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
  it('Should signup a second user', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signup2);
    res.status.should.be.equal(201);
    res.body.data.firstName.should.be.equal('Emman');
    res.body.data.lastName.should.be.equal('Nuell');
    res.body.data.email.should.be.equal('emman@yahoo.com');
  });
  it('Should fail if email is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signupEmailOmitted);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"email" is not allowed to be empty');
  });
  it('Should fail if email is not string', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.emailNotString);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"email" must be a string');
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
  it('Should fail if firstName is not string', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.invalidFirstName);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"firstName" must be a string');
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
  it('Should fail if lastName is not string', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.invalidLastName);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"lastName" must be a string');
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
  it('Should fail if password is not string', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.passwordNotString);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"password" must be a string');
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
  it('Should signin an admin', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(userInfo.adminSignin);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    adminToken = res.body.data.token;
  });
  it('Should signin a user', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(userInfo.signin);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    userToken = res.body.data.token;
  });
  it('Should signin a second user', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(userInfo.signin2);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
    userToken2 = res.body.data.token;
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
  it('Should fail to update an item if token is missing', async () => {
    const res = await chai.request(server)
      .patch(`/api/v1/items/${itemId}`)
      .set('x-auth-token', '')
      .send(itemInfo.updateItem);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail to update an item if the ID is invalid', async () => {
    const res = await chai.request(server)
      .patch('/api/v1/items/60e76917878776d19')
      .set('x-auth-token', adminToken)
      .send(itemInfo.updateItem);
    res.status.should.be.equal(400);
    res.body.should.be.a('object');
  });
  it('Should update an item', async () => {
    const res = await chai.request(server)
      .patch(`/api/v1/items/${itemId}`)
      .set('x-auth-token', adminToken)
      .send(itemInfo.updateItem);
    res.status.should.be.equal(200);
  });
  it('Should fail to delete item if token is missing ', async () => {
    const res = await chai.request(server)
      .delete(`/api/v1/items/${itemId}`)
      .set('x-auth-token', '');
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail to delete item if token is invalid', async () => {
    const res = await chai.request(server)
      .delete(`/api/v1/items/${itemId}`)
      .set('x-auth-token', '5e234d94dbb89024f04a2507');
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail to delete item if ID is invalid', async () => {
    const res = await chai.request(server)
      .delete('/api/v1/items/60e7628806d19')
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(400);
    res.body.should.be.a('object');
  });
  it('Should delete an item if is admin', async () => {
    const res = await chai.request(server)
      .delete(`/api/v1/items/${itemId}`)
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
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
  it('Should fail to update an item if is not admin', async () => {
    const res = await chai.request(server)
      .patch(`/api/v1/items/${itemId}`)
      .set('x-auth-token', userToken)
      .send(itemInfo.updateItem);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail to delete an item if is not admin', async () => {
    const res = await chai.request(server)
      .delete(`/api/v1/items/${itemId}`)
      .set('x-auth-token', userToken);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
});

describe('Test cart endpoint Admin', () => {
  it('Should fail to create a cart', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', adminToken)
      .send(cartInfo.quantity);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail to get cart', async () => {
    const res = await chai.request(server)
      .get('/api/v1/cart')
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail to delete item from cart as an admin', async () => {
    const res = await chai.request(server)
      .delete(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
});

describe('Test cart endpoint User', () => {
  it('should create an item', async () => {
    const res = await chai.request(server)
      .post('/api/v1/items/')
      .set('x-auth-token', adminToken)
      .send(itemInfo.newItem2);
    res.status.should.be.equal(201);
    itemId2 = res.body.data.id;
  });
  it('Should fail if token is missing', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', '')
      .send(cartInfo.newCart);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail if token is invalid', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', '123wewe')
      .send(cartInfo.quantity);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail if quantity is invalid', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', '123wewe')
      .send(cartInfo.quantity);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail if quantity is not a number or ommitted', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', userToken)
      .send(cartInfo.quantityNotNumber);
    res.status.should.be.equal(400);
    res.body.should.be.a('object');
    res.body.error.should.have.eql('"quantity" must be a number');
  });
  it('Should fail if quantity is more than 1000000', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', userToken)
      .send(cartInfo.invalidQuantity);
    res.status.should.be.equal(400);
    res.body.should.be.a('object');
    res.body.error.should.have.eql('"quantity" must be less than or equal to 1000000');
  });
  it('Should fail if item ID is invalid', async () => {
    const res = await chai.request(server)
      .post('/api/v1/cart/1')
      .set('x-auth-token', userToken)
      .send(cartInfo.quantity);
    res.status.should.be.equal(404);
    res.body.should.be.a('object');
  });
  it('Should create a cart', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId2}`)
      .set('x-auth-token', userToken)
      .send(cartInfo.quantity);
    res.status.should.be.equal(201);
    res.body.should.be.a('object');
  });
  it('Should add to a created cart', async () => {
    const res = await chai.request(server)
      .post(`/api/v1/cart/${itemId2}`)
      .set('x-auth-token', userToken)
      .send(cartInfo.quantity);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
  });
  it('Should get cart', async () => {
    const res = await chai.request(server)
      .get('/api/v1/cart')
      .set('x-auth-token', userToken);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
  });
  it('Should fail to get cart if token is invalid', async () => {
    const res = await chai.request(server)
      .get('/api/v1/cart')
      .set('x-auth-token', '');
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should fail to delete item from cart if token is invalid', async () => {
    const res = await chai.request(server)
      .delete(`/api/v1/cart/${itemId}`)
      .set('x-auth-token', '');
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('Should delete an item from cart', async () => {
    const res = await chai.request(server)
      .delete(`/api/v1/cart/${itemId2}`)
      .set('x-auth-token', userToken);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
  });
});

describe('Test order endpoint User', () => {
  it('should fail to create an order if admin', async () => {
    const res = await chai.request(server)
      .post('/api/v1/order/')
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('should fail to get an order if admin', async () => {
    const res = await chai.request(server)
      .get('/api/v1/order/')
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
});

describe('Test order endpoint User', () => {
  it('should fail to create an order', async () => {
    const res = await chai.request(server)
      .post('/api/v1/order/')
      .set('x-auth-token', userToken2);
    res.status.should.be.equal(404);
    res.body.should.be.a('object');
  });
  it('should fail to create an order if token is missing', async () => {
    const res = await chai.request(server)
      .post('/api/v1/order/')
      .set('x-auth-token', '');
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('should fail to create an order if token is admin taken', async () => {
    const res = await chai.request(server)
      .post('/api/v1/order/')
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  it('should create an order', async () => {
    const res = await chai.request(server)
      .post('/api/v1/order/')
      .set('x-auth-token', userToken);
    res.status.should.be.equal(200);
  });
  it('should get an order', async () => {
    const res = await chai.request(server)
      .post('/api/v1/order/')
      .set('x-auth-token', userToken);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
  });
  it('should fail to get an order if no order was created by you', async () => {
    const res = await chai.request(server)
      .get('/api/v1/order/')
      .set('x-auth-token', userToken2);
    res.status.should.be.equal(404);
    res.body.should.be.a('object');
  });
});

describe('Test all users endpoint Admin', () => {
  it('should view all users', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users/')
      .set('x-auth-token', adminToken);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
  });
  it('should fail to view all users if token is invalid', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users/')
      .set('x-auth-token', '');
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
});

describe('Test all users endpoint User', () => {
  it('should fail to view all users if User', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users/')
      .set('x-auth-token', userToken);
    res.status.should.be.equal(401);
    res.body.should.be.a('object');
  });
  after(() => {
    mongoose.connection.collection('users').drop();
    mongoose.connection.collection('items').drop();
  });
});
