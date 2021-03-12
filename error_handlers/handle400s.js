exports.handle400s = (err, req, res, next) => {
  if (err.code === '22P02' || err.code === '23502') {
    res.status(400).send({ msg: 'Bad Request' });
  } else if (err.code === '23503') {
    res.status(404).send({ msg: 'Path Not Found' });
  } else next(err);
};
