const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  port: 5432,
});

const resolvers = {
  Query: {
    users: async () => {
      const { rows } = await pool.query('SELECT * FROM users');
      return rows;
    },
    user: async (_, { id }) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        id,
      ]);
      return rows[0];
    },
  },
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      const { rows } = await pool.query(
        'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
        [name, email, age]
      );
      return rows[0]
    },
    updateUser: async (_, { id, name, email, age }) => {
      const { rows } = await pool.query(
        'UPDATE users SET name = $2, email = $3, age = $4 WHERE id = $1 RETURNING *',
        [id, name, email, age]
      );
      return rows[0];
    },
    deleteUser: async (_, { id }) => {
      const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [
        id,
      ]);
      return rowCount;
    },
  },
};

module.exports = resolvers;
