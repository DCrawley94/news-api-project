exports.up = function (knex) {
  //console.log('creating articles table');
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id');
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 1000000).notNullable();
    articlesTable.integer('votes').defaultTo(0).notNullable();
    articlesTable.string('topic').references('topics.slug').notNullable();
    articlesTable.string('author').references('users.username');
    articlesTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  //console.log('removing articles table');
  return knex.schema.dropTable('articles');
};
