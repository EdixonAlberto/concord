async function configLoad(): Promise<void> {
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

    if (result.error) throw new Error(result.error.message)
    else {
      console.log(`>> ENV: environment "${basename(path)}" loaded successfully`)
      global.env = process.env as unknown as TEnv
    }
  }
}

export { configLoad }
