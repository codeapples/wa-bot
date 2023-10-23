import type { UserFacingSocketConfig, WASocket } from '@whiskeysockets/baileys'
import { makeCacheableSignalKeyStore, makeInMemoryStore, makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys'
import { logger } from '~/utils/logger'
import { handleEvents } from '~/wa/events'

const storePath = './session/data.json'

export const store = makeInMemoryStore({ logger })
store?.readFromFile(storePath)

// save every 10s
setInterval(() => {
  store?.writeToFile(storePath)
}, 10_000)

export async function startWA() {
  const { state } = await useMultiFileAuthState('session')

  const sockOptions: UserFacingSocketConfig = {
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),

    },
    printQRInTerminal: true,
    logger,
  }

  const sock: WASocket = makeWASocket(sockOptions)
  store?.bind(sock.ev)
  handleEvents(sock).catch(err => logger.error(err))
}
