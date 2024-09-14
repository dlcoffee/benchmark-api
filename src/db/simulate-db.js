import logger from '../logger.js'

let id = 0

async function insert() {
  return new Promise((resolve) => {
    let insertId = ++id
    logger.info({ id: insertId }, 'start insert')

    setTimeout(() => {
      logger.info({ id: insertId }, 'resolved')
      resolve()
    }, 5_000)
  })
}

export const simulateDb = {
  insert,
}
