import { logger } from '~UTILS'

export async function configLoad(): Promise<void> {
  if (typeof process.env.TOKEN === 'undefined') {
    const { access } = await import('fs/promises')
    const { resolve, basename } = await import('path')
    const { config } = await import('dotenv')

    const NODE_ENV = (process.env.NODE_ENV as TNodeEnv) || 'development'
    let path = ''

    try {
      await access(resolve('env'))
      path = resolve('env', `${NODE_ENV}.env`)
    } catch (_) {
      path = resolve('.env')
    } finally {
      const result = config({ path })

      if (result.error) throw new Error(`ERROR-ENV -> ${result.error.message}`)
      else logger('ENV', `Environment "${basename(path)}" loaded successfully`)
    }
  }
}

export function getConfig(): TConfig {
  const ENV: NodeJS.ProcessEnv = process.env

  return {
    PREFIX: (ENV.PREFIX as string) || '$',
    TOKEN: (ENV.TOKEN as string) || '',
    MODE_DEV: (process.env.NODE_ENV as TNodeEnv) !== 'production'
  }
}
