const connection = require('../db/connection');

exports.fetchUserById = (username) => {
  return connection
    .select('*')
    .from('users')
    .where('username', username)
    .then((userRows) => {
      if (userRows.length > 0) {
        return userRows[0];
      } else {
        return Promise.reject({ status: 404, msg: 'Username not found' });
      }
    });
};

exports.checkUserExists = (author) => {
  return connection('users')
    .select('*')
    .where('username', '=', author)
    .then((users) => {
      if (!users.length) {
        return Promise.reject({ status: 404, msg: 'Author Not Found' });
      }
    });
};
