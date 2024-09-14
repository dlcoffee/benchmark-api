import knex from 'knex'

export const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  acquireConnectionTimeout: 1_000,
  pool: { min: 0, max: 2 },
})
