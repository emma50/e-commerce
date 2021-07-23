import current from './current';
import trimAndUppercase from './trimAndUppercase';

export default class userObjects {
  static async currentUser(req, res, next) {
    await current(req, res, next);
  }

  static newUser(hash, req) {
    const values = {
      email: req.body.email,
      firstName: trimAndUppercase(req.body.firstName),
      lastName: trimAndUppercase(req.body.lastName),
      hash,
    };
    return values;
  }
}
