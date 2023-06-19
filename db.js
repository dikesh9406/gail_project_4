import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456789",
  port: 5001,
  database: "gail"
});

const db = {
  query: async (text, params) => {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  },
};

export default db;
