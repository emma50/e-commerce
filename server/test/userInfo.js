const userInfo = {
  adminSignup: {
    firstName: 'Admin',
    lastName: 'Owner',
    password: 'admin2312',
    email: 'admin@ecommerce.com',
    mobileNo: '+23408123456754',
    isAdmin: true,
  },
  signup: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  signupEmailOmitted: {
    email: '',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  emailNotString: {
    email: 2,
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  invalidEmail: {
    email: 'emmanuel:yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  highEmailLength: {
    email: 'emmanuelywydgsghdhdgdghhsggdghhsgghwtydgghjdghds@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  omittedFirstName: {
    email: 'emmanuel@yahoo.com',
    firstName: '',
    lastName: 'Wick',
    password: 'emma@2019',
    mobileNo: '+23408123456854',
  },
  invalidFirstName: {
    email: 'emmanuel@yahoo.com',
    firstName: 2,
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  lowFirstNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'w',
    lastName: 'Wick',
    password: 'emma@2019',
    mobileNo: '+23408123456854',
  },
  highFirstNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'wqwertyuiopasdfghjklzxcvbnmaswedrfgthyuiohfdefertghiuhfdwedes',
    lastName: 'Wick',
    password: 'emma@2019',
    mobileNo: '+23408123456854',
  },
  omittedLastName: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: '',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  invalidLastName: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 2,
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  lowLastNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'v',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  highLastNameLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklasdfzxcvbnmgh',
    password: 'emma@2020',
    mobileNo: '+23408123456854',
  },
  omittedPassword: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: '',
    mobileNo: '+23408123456854',
  },
  passwordNotString: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 2,
    mobileNo: '+23408123456854',
  },
  lowPasswordLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'kick',
    mobileNo: '+23408123456854',
  },
  highPasswordLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: '1234567890qwertyuio12344567890qweasdzxcvasqwertyuiopasdfghjk',
    mobileNo: '+23408123456854',
  },
  omittedMobileNo: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '',
  },
  mobileNoNotString: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: 23408123456854,
  },
  lowMobileNoLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+234',
  },
  highMobileNoLength: {
    email: 'emmanuel@yahoo.com',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    mobileNo: '+23408123456854245365749',
  },
  adminSignin: {
    email: 'admin@ecommerce.com',
    password: 'admin2312',
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
  signup2: {
    firstName: 'Emman',
    lastName: 'Nuell',
    email: 'emman@yahoo.com',
    password: '123456789',
    mobileNo: '+23408123456789',
  },
  signin2: {
    email: 'emman@yahoo.com',
    password: '123456789',
  },
  signup3: {
    firstName: 'Markie',
    lastName: 'Nuella',
    email: 'emma23121994@gmail.com',
    password: '12345678910',
    mobileNo: '+23408123456799',
  },
  signin3: {
    email: 'emma23121994@gmail.com',
    password: '12345678910',
  },
  resetPasswordEmail: {
    email: 'emma23121994@gmail.com',
  },
  invalidResetPasswordEmail: {
    email: 'emma2312199com',
  },
  resetPassword: {
    password: '123456789101',
  },
  invalidResetPassword: {
    password: '1',
  },
};

export default userInfo;
