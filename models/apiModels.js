const fs = require('fs');

exports.fetchEndpoints = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./endpoints.json', 'utf8', (err, data) => {
      if (err) reject(err);
      else {
        data = JSON.parse(data);
        resolve(data);
      }
    });
  });
};
