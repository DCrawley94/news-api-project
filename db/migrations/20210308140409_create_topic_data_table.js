exports.up = function (knex) {
  // console.log('creating topic table');
  return knex.schema.createTable('topics', (topicsTable) => {
    //topicsTable.increments('topic_id', { primaryKey: false });
    topicsTable.string('description').notNullable();
    topicsTable.string('slug').primary();
  });
};

exports.down = function (knex) {
  // console.log('removing topics table');
  return knex.schema.dropTable('topics');
};
