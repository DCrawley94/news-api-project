<h1 align="center">Welcome to NC News Api 👋</h1>

This is a mock News Api that was made a a back-end project as part of the Northcoders Bootcamp. It can be found [here](https://news-api-project.herokuapp.com/api).
<br/>
For this project I learnt how to make use of Express, Postgres and Knex to create a funtional API with multiple endpoints listed below:

```http

GET /api

GET /api/topics

GET /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

GET /api/users/:username

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id
```

</br>

## Roadmap

While this is a funtional API my plans to add more endpoints are on hold until I complete the course after which I will hopefully have the time to add some more.
<br/>
These will include:

```http
GET /api/articles (with queries/pagination)
GET /api/articles/:article_id/comments(with queries/pagination)
DELETE /api/articles/:article_id
POST /api/topics
POST /api/users
GET /api/users
```

## For Developers

### Minimum version requirements

<strong> Node.js: </strong> v15.6.0

<strong> Postgres: </strong> v8.5.1

</br>

### Install

Fork my project the clone to your local machine e.g:

```sh
git clone https://github.com/DCrawley94/be-nc-news.git
```

Install all dependencies using a package manager e.g:

```sh
npm install
```

</br>

Additionally this project requires the creation of your own <strong>knexfile.js</strong> which should look like this:

```sh

const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
      username: '*YOUR PSQL USERNAME HERE*',
      password: '*YOUR PSQL PASSWORD HERE*',
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: '*YOUR PSQL USERNAME HERE*',
      password: '*YOUR PSQL USERNAME HERE*',
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };

```

More information on creating your version can be found [here](http://knexjs.org/#knexfile).

</br>

To seed the database simply run the seeding script using your package manager e.g:

```sh
npm run seed
```

</br>

### Run tests

There is a test suite written that tests all current endpoints and error handling as well as several utility functions used in the seeding process.

```sh
npm run test
```

<br/>

## Author

👤 **Duncan Crawley**

- Github: [@DCrawley94](https://github.com/DCrawley94)
- LinkedIn: [@duncan-crawley](https://linkedin.com/in/duncan-crawley)
- My Portfolio: https://dcrawley94.github.io/
