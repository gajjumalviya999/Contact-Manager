const errorHandler = (err, req, res, next) => {
  res.status(400);
  res.json({ message: err.message });
};

module.exports = errorHandler;
