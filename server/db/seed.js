import db from './index';
import User from '../models/userModel';

const seed = {
  firstName: 'Admin',
  lastName: 'Owner',
  hash: 'admin2312',
  isAdmin: true,
  email: 'admin@ecommerce.com',
};

// const seed = {
//   "firstName": "Admin",
//   "lastName": "Owner",
//   "password": "admin2312",
//   "isAdmin": true,
//   "email": "admin@ecommerce.com",
// };

const seedTables = async () => {
  try {
    const seeded = await db.query(User.create(seed));
    console.log(seeded);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seedTables,
};

require('make-runnable');
