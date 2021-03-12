exports.customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.send405error = (req, res, next) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};
