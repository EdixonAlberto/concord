export async function loadConfig() {
  if (process.env.NODE_ENV !== 'production') {
    // Loading environment variables from path .env
    const result = (await import('dotenv')).config({ path: '.env' });
    if (result.error) throw new Error(`ERROR-CONFIG -> ${result.error}`);
  }
  const ENV: NodeJS.ProcessEnv = process.env;

  const config: TConfig = {
    discordToken: ENV.DISCORD_TOKEN as string
  };

  global.config = config;
  console.log('>> CONFIG -> OK');
}
