export const errorHandler = (err, req, res, next) => {
  console.log("hii");
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: err });
};
