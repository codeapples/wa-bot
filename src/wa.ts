import { Client, Events, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode'
import { logger } from '~/utils/logger'

const wa = new Client({
  puppeteer: { args: ['--no-sandbox'] },
  authStrategy: new LocalAuth({ dataPath: './session' }),
})

wa.on(Events.QR_RECEIVED, (qr) => {
  qrcode.toString(qr, { type: 'terminal', small: true }, (err, url) => {
    err ? logger.error(err) : logger.info(`\n${url}`)
  })
})

wa.on(Events.AUTHENTICATED, () => {
  logger.info('WhatsApp authenticated')
})

wa.on(Events.AUTHENTICATION_FAILURE, () => {
  logger.error('WhatsApp authentication failure')
})

wa.on(Events.READY, () => {
  logger.info('WhatsApp ready')
})

export { wa }
