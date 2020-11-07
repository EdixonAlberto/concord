import { loadConfig } from './loadConfig';
import { Bot } from '@edixon/concord';
import * as commands from './commands';

async function main() {
  try {
    await loadConfig();

    const bot = new Bot({
      token: global.config.discordToken,
      prefix: '>',
      color: '#566CB5',
      commands
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
