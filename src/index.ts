import 'dotenv/config'
import { startWA } from '~/wa'
import { logger } from '~/utils/logger'

startWA().catch(err => logger.error(err))
