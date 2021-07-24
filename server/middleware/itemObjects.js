import current from './current';
import shape from './shape';

export default class itemObjects {
  static async currentItem(req, res, next) {
    await current(req, res, next);
  }

  static newItem(req) {
    const values = {
      title: shape.uppercase(req.body.title),
      description: shape.uppercase(req.body.description),
      category: shape.uppercase(req.body.category),
      price: parseFloat(req.body.price).toFixed(2),
    };
    // const values = {
    //   title: req.body.title,
    //   description: req.body.description,
    //   category: req.body.category,
    //   price: parseFloat(req.body.price).toFixed(2),
    // };
    return values;
  }
}
