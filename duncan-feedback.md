## CODE

### migrations

-remove console logs/commented out code
-notNullable missing on articles author
-otherwise all great! All defaults and notNullables there with all correct columns

### seeding

- all working fine!

### utils

- good mutation tests
- discussed the formatDate function, still a mystery as to why it worked for you!

### app

- nice clean app.js good use of imported error handlers

### routes

- good routes files
- could extract the 405 error out as it is used repeatedly
- 405 error handler not implemented everywhere with .all()

### controllers

- nice destructuring from req.params and req.body
- great that every controller has a catch block

### models

- fab to see your own comments in the articles model to remind yourself what each line of code does
- good use of Promise.reject() if article does not exist
- challenge: use array destructuring rather than articlesRows[0] to access object in the array (this applies across your models, not just the articles one!)

### errors

- good error handlers
- as you add more to the handle400s function, think about other ways you could write the logic to handle what status and message to send. Perhaps an array of psql error codes? An object with the psql error code and status code and msg?

### misc

- really readable code! This is a great API, well done Duncan!

## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### PATCH `/api/articles`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

//this is personal preference if you would rather treat it as a 400 because the body has not been correctly inputted, that's fine

### GET `/api/articles/1000/comments`

Assertion: expected 200 to equal 404

Hints:

- return 404: Not Found when given a valid `article_id` that does not exist

# BE Northcoders News Check List

## Readme

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `knexfile.js`
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)

## Migrations

- [ ] Use `notNullable` on required fields
- [ ] Default `created_at` in articles and comments tables to the current date:`.defaultTo(knex.fn.now());`
- [ ] Delete all comments when the article they are related to is deleted: Add `.onDelete("CASCADE");` to `article_id` column in `comments` table.

## Seeding

- [ ] Make sure util functions do not mutate data
- [ ] Make util functions easy to follow with well named functions and variables
- [ ] Test util functions
- [ ] Migrate rollback and migrate latest in seed function

## Tests

- [ ] Cover all endpoints and errors
- [ ] Ensure all tests are passing

## Routing

- [ ] Split into api, topics, users, comments and articles routers
- [ ] Use `.route` for endpoints that share the same path
- [ ] Use `.all` for 405 errors

## Controllers

- [ ] Name functions and variables well
- [ ] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- [ ] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] No unnecessary use of `.modify()` (i.e. only for author and topic queries)
- [ ] Use `leftJoin` for comment counts

## Errors

- [ ] Use error handling middleware functions in app and extracted to separate directory/file
- [ ] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an article body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles created in last 10 minutes
- [ ] Get: Get all articles that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics
