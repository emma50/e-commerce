function state(res, status, message, data) {
  return res.status(status).json({
    status,
    message,
    data,
  });
}

export default state;
