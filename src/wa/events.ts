/* eslint-disable ts/no-misused-promises */
import process from 'node:process'
import type { WASocket } from '@whiskeysockets/baileys'
import { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys'
import type { Boom } from '@hapi/boom'
import { logger } from '~/utils/logger'
import { processMessage } from '~/wa/messages'
import { startWA } from '~/wa'

export async function handleEvents(sock: WASocket) {
  const { saveCreds } = await useMultiFileAuthState('session')

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const isLoggedOut = (lastDisconnect?.error as Boom)?.output?.statusCode === DisconnectReason.loggedOut
      // reconnect if not logged out
      if (!isLoggedOut)
        process.exit(0)
      else
        startWA().catch(err => logger.error(err))
    }
  })

  sock.ev.on('messages.update', async (msgUpdates) => {
    logger.debug(msgUpdates, 'msg updates')
  })

  // eslint-disable-next-line unused-imports/no-unused-vars
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    messages.forEach(async msg => await processMessage(sock, msg))
  })

  /* sock.ev.process(
    async (event) => {
      logger.debug(event, 'event proc')
    },
  ) */
}
