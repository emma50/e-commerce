function trimAndUppercase(req) {
  const request = req.trim();
  return request[0].toUpperCase() + request.substring(1);
}

export default trimAndUppercase;
