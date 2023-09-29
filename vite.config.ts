import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig, UserConfigExport } from 'vite'

export default ({ /* command, */ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, './')
  process.env = { ...process.env, ...env }

  const resolve: UserConfig['resolve'] = {
    alias: {
      '~/': 'src/',
    },
  }

  return defineConfig({
    resolve,
  })
}
