import current from './current';
import shape from './shape';

export default class userObjects {
  static async currentUser(req, res, next) {
    await current(req, res, next);
  }

  static newUser(hash, req) {
    const values = {
      email: shape.trim(req.body.email),
      firstName: shape.uppercase(req.body.firstName),
      lastName: shape.uppercase(req.body.lastName),
      mobileNo: shape.trim(req.body.mobileNo),
      hash,
    };
    // const values = {
    //   email: req.body.email,
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   mobileNo: req.body.mobileNo,
    //   hash,
    // };
    return values;
  }
}
