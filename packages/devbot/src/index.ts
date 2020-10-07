import { loadConfig } from './loadConfig';
import { Bot } from '@edixon/concord';

async function main() {
  try {
    await loadConfig();

    const bot = new Bot({
      prefix: '>',
      token: global.config.discordToken
    });

    await bot.start();
  } catch (error) {
    console.error(error);
  }
}

main();
