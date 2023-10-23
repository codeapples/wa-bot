import type { WAMessage, WASocket } from '@whiskeysockets/baileys'
import { logger } from '~/utils/logger'
import { store } from '~/wa'

export async function processMessage(sock: WASocket, msg: WAMessage) {
  logger.debug(msg, 'Processing message...')

  if (msg.key.fromMe)
    return
  else
    await sock.readMessages([msg.key])

  if (msg.message?.conversation?.startsWith('!ping'))
    await sock.sendMessage(msg.key.remoteJid!, { text: 'pong' }, { quoted: msg })

  if (msg.message?.conversation?.startsWith('!read')) {
    Object.values(store.messages)
      .forEach(e => e.array.forEach((se) => {
        if (!se.key.fromMe && se.status && se.status !== 4) {
          logger.debug(se, 'Marking message as read...')
          sock.readMessages([se.key]).catch(err => logger.error(err))
        }
      }))
  }

  if (msg.message?.conversation?.startsWith('!msgs')) {
    Object.values(store.messages)
      .forEach(e => e.array.forEach((se) => {
        logger.debug(se, 'Message from store...')
      }))
  }
}
