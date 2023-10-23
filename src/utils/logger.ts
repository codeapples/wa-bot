import type { Logger, LoggerOptions } from 'pino'
import pino from 'pino'
import { env } from '~/utils/env'

const options: LoggerOptions = {
  level: env.LOG_LEVEL,
  transport: {
    targets: [
      {
        level: env.LOG_LEVEL,
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          colorize: true,
          ignore: 'pid,hostname',
        },
      },
      {
        level: env.LOG_LEVEL,
        target: 'pino/file',
        options: {
          destination: `logs/app.log`,
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
    ],
  },
}

export const logger: Logger = pino(options)
