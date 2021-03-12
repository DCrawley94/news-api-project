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
    describe('Error handling', () => {
      test('status 405 when method is invalid', () => {
        return request(app)
          .delete('/api/topics')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Method Not Allowed');
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
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Username not found');
            });
        });
      });
    });
    describe('Error handling', () => {
      test('status 405 when method is invalid', () => {
        return request(app)
          .delete('/api/users/butter_bridge')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Method Not Allowed');
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
            expect(article).toHaveProperty('created_at');
            // console.log(typeof article.created_at, '<---- app test');
            // console.log(
            //   article.created_at,
            //   '<---in app.test',
            //   new Date(1542284514171)
            // );
            //expect(article.created_at instanceof Date).toBe(true);
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
    describe('Error handling', () => {
      test('status 405 when method is invalid', () => {
        return request(app)
          .delete('/api/articles/1')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Method Not Allowed');
          });
      });
    });
  });
  describe('/articles/:article_id/comments', () => {
    describe('POST', () => {
      test('status 201, responds with posted comment ', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            username: 'lurker',
            body: 'I find the challenge existing',
          })
          .expect(201)
          .then(({ body: { comment } }) => {
            expect(comment.body).toBe('I find the challenge existing');
            expect(comment.author).toBe('lurker');
            expect(comment.article_id).toBe(1);
            expect(comment.votes).toBe(0);
            expect(comment).toHaveProperty('created_at');
          });
      });
      test('status 201, comment is succesfully posted to the database ', () => {
        return request(app)
          .post('/api/articles/5/comments')
          .send({ username: 'lurker', body: 'duncan woz ere' })
          .expect(201)
          .then(() => {
            return connection
              .select('*')
              .from('comments')
              .where('comment_id', 19)
              .then((comment) => {
                expect(comment.length).toBe(1);
                comment = comment[0];
                expect(comment.body).toBe('duncan woz ere');
                expect(comment.author).toBe('lurker');
                expect(comment.article_id).toBe(5);
                expect(comment.votes).toBe(0);
                expect(comment).toHaveProperty('created_at');
              });
          });
      });
      describe('Error handling', () => {
        test('status 404 if article id is valid but non-existant', () => {
          return request(app)
            .post('/api/articles/50000/comments')
            .send({ username: 'lurker', body: 'duncan woz ere' })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('Path Not Found');
            });
        });
        test('status 400 if article id is invalid', () => {
          return request(app)
            .post('/api/articles/pidgeon_party/comments')
            .send({ username: 'lurker', body: 'duncan woz ere' })
            .expect(400);
        });
        test('status 404 if author is valid but non-existant ', () => {
          return request(app)
            .post('/api/articles/5/comments')
            .send({ username: 'duncan', body: 'duncan woz ere' })
            .expect(404);
        });
        test('status 400 if posted body is malformed ', () => {
          return request(app)
            .post('/api/articles/5/comments')
            .send({ username: 'lurker' })
            .expect(400);
        });
        test('status 400 if posted body is malformed', () => {
          return request(app)
            .post('/api/articles/5/comments')
            .send({ body: 'duncan woz ere' })
            .expect(400);
        });
      });
    });
    describe.only('GET', () => {
      test('status 200, responds with array of comments default sorted by created_at', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(Array.isArray(comments)).toBe(true);
            expect(comments.length).toBe(13);
            expect(comments[0]).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            });
            expect(comments).toBeSortedBy('created_at', { descending: true });
          });
      });
      test('status 200, responds with array of comments sorted by given query', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=votes')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).toBeSortedBy('votes', { descending: true });
          });
      });
      test('status 200, responds with array ordered according to given query', () => {
        return request(app)
          .get('/api/articles/1/comments?order=asc')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).toBeSortedBy('created_at');
          });
      });
      test('status 200, responds with array sorted AND ordered by given queries', () => {
        return request(app)
          .get('/api/articles/1/comments?order=asc&sort_by=author')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).toBeSortedBy('author');
          });
      });
      describe('Error handling', () => {
        test("return 404 if article_id is valid but doesn't exist", () => {
          return request(app).get('/api/articles/57493/comments').expect(404);
        });
      });
    });
    describe('Error Handling', () => {
      test('status 405 if invalid method', () => {
        return request(app)
          .delete('/api/articles/5/comments')
          .send({ username: 'lurker', body: 'duncan woz ere' })
          .expect(405);
      });
    });
  });
});
