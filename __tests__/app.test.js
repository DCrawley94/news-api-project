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
      describe('Error handling', () => {
        test("status 404 when given a username that doesn't exist *YET*", () => {
          return request(app)
            .get('/api/users/duncancrawley')
            .expect(404)
            .then(({ body }) => {
              expect(body).toHaveProperty('msg');
              expect(body.msg).toBe('Username not found');
            });
        });
      });
    });
  });
  describe('/articles/:article_id', () => {
    describe('GET', () => {
      test('status 200, returns article object of correct id', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.author).toBe('butter_bridge');
            expect(article.title).toBe('Living in the shadow of a great man');
            expect(article.article_id).toBe(1);
            expect(article.body).toBe('I find this existence challenging');
            expect(article.topic).toBe('mitch');
            expect(article.created_at).toBe('2018-11-15T12:21:54.000Z');
            expect(article.votes).toBe(100);
          });
      });
      test('status 200, return correct article object with addition of comment_count', () => {
        return request(app)
          .get('/api/articles/5')
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).toHaveProperty('comment_count');
            expect(article.comment_count).toBe('2');
          });
      });
      describe('Error handling', () => {
        test("status 404 when given an article_id that doesn't exist *YET*", () => {
          return request(app)
            .get('/api/articles/10573')
            .expect(404)
            .then(({ body }) => {
              expect(body).toHaveProperty('msg');
              expect(body.msg).toBe('Article not found');
            });
        });
        test('status 400 when given an invalid article id', () => {
          return request(app)
            .get('/api/articles/pidgeon_party')
            .expect(400)
            .then(({ body }) => {
              expect(body).toHaveProperty('msg');
              expect(body.msg).toBe('Bad Request');
            });
        });
      });
    });
    describe('PATCH', () => {
      test('status 200, responds with updated article object', () => {
        return request(app)
          .patch('/api/articles/5')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.author).toBe('rogersop');
            expect(article.title).toBe(
              'UNCOVERED: catspiracy to bring down democracy'
            );
            expect(article.article_id).toBe(5);
            expect(article.body).toBe(
              'Bastet walks amongst us, and the cats are taking arms!'
            );
            expect(article.topic).toBe('cats');
            expect(article).toHaveProperty('created_at');
            expect(article.votes).toBe(1);
          });
      });
      test('status 200, article is successfully patched', () => {
        return request(app)
          .patch('/api/articles/5')
          .send({ inc_votes: 50 })
          .expect(200)
          .then(() => {
            return connection
              .select('*')
              .from('articles')
              .where('article_id', 5)
              .then((article) => {
                article = article[0];
                expect(article.author).toBe('rogersop');
                expect(article.title).toBe(
                  'UNCOVERED: catspiracy to bring down democracy'
                );
                expect(article.article_id).toBe(5);
                expect(article.body).toBe(
                  'Bastet walks amongst us, and the cats are taking arms!'
                );
                expect(article.topic).toBe('cats');
                expect(article).toHaveProperty('created_at');
                expect(article.votes).toBe(50);
              });
          });
      });
      describe('Error handling', () => {
        test("status 404 when given article_id that doesn't exist *YET", () => {
          return request(app)
            .patch('/api/articles/10573')
            .send({ inc_votes: 5 })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Article not found');
            });
        });
        test('status 400 when given invalid article_id', () => {
          return request(app)
            .patch('/api/articles/pidgeon_party')
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad Request');
            });
        });
        test('status 400 when patch request sent with invalid data type', () => {
          return request(app)
            .patch('/api/articles/5')
            .send({ inc_votes: 'pidgeon_party' })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad Request');
            });
        });
        test('returns 400 when patch request sent with no data', () => {
          return request(app)
            .patch('/api/articles/5')
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Bad Request');
            });
        });
      });
    });
  });
});