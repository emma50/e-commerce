const shape = {
  trim(req) {
    return req.trim();
  },
  uppercase(req) {
    const res = this.trim(req);
    return res[0].toUpperCase() + res.substring(1);
  },
};

export default shape;
