import current from './current';

export default class itemObjects {
  static async currentItem(req, res, next) {
    await current(req, res, next);
  }

  static newItem(req) {
    const values = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price).toFixed(2),
    };
    return values;
  }
}
