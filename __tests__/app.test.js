process.env.NODE_ENV = 'test';
const app = require('../app.js');
const request = require('supertest');
const connection = require('../db/connection.js');

beforeEach(() => {
  return connection.seed.run();
});

afterAll(() => {
  connection.destroy();
});

describe('/api', () => {
  describe('/topics', () => {
    //   describe( 'Error handling', () => {

    // });
    describe('GET', () => {
      test('status 200, responds with all topics  ', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.topics)).toBe(true);
            expect(body.topics[0]).toHaveProperty('description');
            expect(body.topics[0]).toHaveProperty('slug');
            expect(body.topics[0].description).toBe(
              'The man, the Mitch, the legend'
            );
          });
      });
    });
  });
  describe('/users/:username', () => {
    describe('GET', () => {
      test('status 200, returns user object', () => {
        return request(app)
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(({ body }) => {
            expect(body).toHaveProperty('user');
            expect(body.user).toHaveProperty('username');
            expect(body.user).toHaveProperty('avatar_url');
            expect(body.user).toHaveProperty('name');
          });
      });
    });
    describe('Error handling', () => {
      test("status 404 when given a username that doesn't exist", () => {
        return request(app).get('/api/users/duncancrawley').expect(404);
      });
    });
  });
  // describe( '/articles/:article_id', () => {
  //   describe('DELETE', () => {
  //     test('status 204 ', () => {

  //     });
  //   });
  // });
});
