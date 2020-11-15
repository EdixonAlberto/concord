import { loadConfig } from './utils/loadConfig';
import { Bot } from '@edixon/concord';
import { resolve } from 'path';

async function main() {
  try {
    await loadConfig();

    const bot = new Bot({
      token: global.config.discordToken,
      prefix: global.config.prefix,
      color: '#566CB5',
      commandsPath: resolve('dist', 'commands')
    });

    await bot.start();
  } catch (error) {
    console.error(error);
  }
}

main();

// TODO: crear test para probar modulo
// import { ScrapeMozilla } from './modules/ScrapeMozilla';
// (async () => {
//   await ScrapeMozilla.searchDefinition(undefined, 'slice');
// })();
