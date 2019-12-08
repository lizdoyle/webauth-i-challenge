
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('username', 128)
            .notNullable()
            .unique();
        users.string('password', 128).notNullable();
        users.string('firstname', 128);
        users.string('lastname', 128);
        users.string('email', 255);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
  
};
