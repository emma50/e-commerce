import current from './current';

export default class userObjects {
  static async currentUser(req, res, next) {
    await current(req, res, next);
  }

  static newUser(hash, req) {
    const values = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hash,
    };
    return values;
  }
}
