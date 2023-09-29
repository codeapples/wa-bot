import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  level: (() => import.meta.env.DEV ? 'debug' : 'warn')(),
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize({ all: true }),
    format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/all.log',
    }),
  ],
})
