const userInfo = {
  signup: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
  },
  signupEmailOmitted: {
    email: '',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
  },
  invalidEmail: {
    email: 'emmanuel:yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
  },
  highEmailLength: {
    email: 'emmanuelywydgsghdhdgdghhsggdghhsgghwtydgghjdghds@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
  },
  omittedFirstName: {
    email: 'emmanuel@yahoo.com',
    firstName: '',
    lastName: 'Wick',
    password: 'emma@2019',
  },
  lowFirstNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'w',
    lastName: 'Wick',
    password: 'emma@2019',
  },
  highFirstNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'wqwertyuiopasdfghjklzxcvbnmaswedrfgthyuiohfdefertghiuhfdwedes',
    lastName: 'Wick',
    password: 'emma@2019',
  },
  omittedLastName: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: '',
    password: 'emma@2020',
  },
  lowLastNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'v',
    password: 'emma@2020',
  },
  highLastNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklasdfzxcvbnmgh',
    password: 'emma@2020',
  },
  omittedPassword: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: '',
  },
  lowPasswordLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'kick',
  },
  highPasswordLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: '1234567890qwertyuio12344567890qweasdzxcvasqwertyuiopasdfghjk',
  },
  signin: {
    email: 'emmanuel@yahoo.com',
    password: 'emma@2020',
  },
  password: {
    password: 'emma@2020',
  },
  email: {
    email: 'emmanuel@yahoo.com',
  },
  invalidUser: {
    email: 'emmanuelyahoo.com',
    password: 'emma@2020',
  },
  invalidPassword: {
    email: 'emmanuel@yahoo.com',
    password: 'd',
  },
};

export default userInfo;
