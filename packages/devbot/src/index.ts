import { loadConfig } from './loadConfig';
import { Bot } from '@edixon/concord';
import * as commands from './commands';

async function main() {
  try {
    await loadConfig();

    const bot = new Bot({
      prefix: '>',
      token: global.config.discordToken,
      commands
    });

    await bot.start();
  } catch (error) {
    console.error(error);
  }
}

main();
