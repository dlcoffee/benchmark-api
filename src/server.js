import express from 'express'
import logger from 'pino-http'
import { db } from './db/db.js'

const app = express()
const port = 3000

app.use(logger())

app.get('/', async (req, res) => {
  await db.insert()
  res.status(200).json({ success: true })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
