import express from 'express'
import httpLogger from 'pino-http'
import logger from './logger.js'
import { db } from './db/db.js'
import { simulateDb } from './db/simulate-db.js'
import { sleep } from './sleep.js'

const app = express()
const port = 3000

app.use(httpLogger())

app.get('/simulate-item', async (req, res) => {
  await simulateDb.get()
  res.status(200).json({ success: true })
})

app.get('/db', async (req, res) => {
  // const result = await db.select().table('playing_with_neon')
  // console.log(result)

  // pretend we have slow transactions
  try {
    await db.transaction(async (trx) => {
      await sleep(2_000)
      const result = await db('playing_with_neon').where('id', '=', 1)
      console.log(result)
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    logger.error(err, 'something went wrong')
    return res.status(400).json({ success: false })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
