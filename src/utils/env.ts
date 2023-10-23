/* eslint-disable unused-imports/no-unused-vars */
import process from 'node:process'

function castStringEnv(envVar: string, defaultValue = ''): string {
  const env = process.env[envVar]
  return env || defaultValue
}

function castBooleanEnv(envVar: string, defaultValue = false): boolean {
  const env = process.env[envVar]
  return env ? env.toLowerCase() === 'true' : defaultValue
}

function castIntEnv(envVar: string, defaultValue: number): number {
  const env = process.env[envVar]
  return env ? Number.parseInt(env, 10) : defaultValue
}

function castStringArrayEnv(envVar: string, defaultValue: string[] = []): string[] {
  const env = process.env[envVar]
  return env?.length
    ? env.split(',').map(field => field.trim())
    : defaultValue
}

/* function castObjectEnv<T extends Record<string, unknown>>(envVar: string, defaultValue: T = {} as T): T {
  const env = process.env[envVar]
  return env ? JSON.parse(env) : defaultValue
} */

export const env = {
  get NODE_ENV() {
    return castStringEnv('NODE_ENV', 'development')
  },
  get OPENAI_API_KEY() {
    return castStringEnv('OPENAI_API_KEY', 'SOMEKEY')
  },
  get LOG_LEVEL() {
    return castStringEnv('LOG_LEVEL', 'debug')
  },
  get WA_ADMIN_ID() {
    return castStringEnv('WA_ADMIN_ID', '00000000000@s.whatsapp.net')
  },
}
