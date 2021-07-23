import current from './current';
import trimAndUppercase from './trimAndUppercase';

export default class itemObjects {
  static async currentItem(req, res, next) {
    await current(req, res, next);
  }

  static newItem(req) {
    const values = {
      title: trimAndUppercase(req.body.title),
      description: trimAndUppercase(req.body.description),
      category: trimAndUppercase(req.body.category),
      price: parseFloat(req.body.price).toFixed(2),
    };
    return values;
  }
}
