import { wa } from '~/wa'
import { logger } from '~/utils/logger'

// env test
logger.info(`Initializing... Key: ${import.meta.env.VITE_OPENAI_API_KEY}`)

wa.initialize()
  .catch(err => logger.error(err))
