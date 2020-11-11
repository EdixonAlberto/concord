import { Client, Message } from 'discord.js';
import { promises as fs } from 'fs';
import { resolve } from 'path';

import { BotResponse } from './BotResponse';
import { MessageProcessor } from './MessageProcessor';
import * as commandsDefault from './commandsDefault';
import { TOptions, TContent } from '@types';

class Bot {
  private readonly options: TOptions;
  private client: Client;
  static commands: object = {};

  constructor(_options: TOptions) {
    this.options = _options;
    this.client = new Client();
    this.commandLoad(_options.commandsPath);
    this.event();
  }

  public async start(): Promise<void> {
    try {
      await this.client.login(this.options.token);
    } catch (error) {
      console.log('!! ERROR-BOT ->', error.message);
    }
  }

  private event(): void {
    this.client.on('ready', () => console.log('>> BOT -> OK'));

    this.client.on('message', (message: Message) => {
      const { content } = new MessageProcessor(message);
      const response: BotResponse = new BotResponse(message, this.options.color);

      this.commandRun(content, response);
    });
  }

  private commandRun(content: TContent, response: BotResponse): void {
    if (content.prefix === this.options.prefix) {
      console.log('>> COMMAND-RUN -> ' + JSON.stringify(content));

      // create pack commands
      const commandsPack = {
        ...commandsDefault,
        ...Bot.commands
      };

      try {
        if (commandsPack[content.command]) {
          // Execute command dynamically
          commandsPack[content.command]({ content, response });
        } else throw new Error(`Incorrect commnad: "${content.command}"`);
      } catch (error) {
        response.general('❌ Comando Incorrecto');
        console.error('!! WARN-COMMAND-RUN ->', error.message);
      }
    }
  }

  private async commandLoad(commandsPath?: string): Promise<void> {
    // load commands from files
    const path = commandsPath || resolve('src', 'commands');
    const commandFiles = await fs.readdir(path);

    for (const file of commandFiles) {
      // Verify the name of the command files
      if (file.search(/[a-z0-9]*\.command\.js/) > -1) {
        const command = await import(resolve(path, file));
        // create commands object
        Bot.commands = { ...Bot.commands, ...command };
      }
    }
  }
}

export { Bot };
