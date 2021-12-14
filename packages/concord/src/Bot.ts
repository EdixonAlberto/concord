import { Client, Message, Intents } from 'discord.js'
import { promises as fs } from 'fs'
import { resolve } from 'path'

import { BotResponse } from './BotResponse'
import { MessageProcessor } from './MessageProcessor'
import * as commandsDefault from './commandsDefault'
import { configLoad } from '~UTILS/configLoad'
import { TOptionsDefault, TOptions } from '~ENTITIES/types'

class Bot {
  private _options: TOptionsDefault
  private client: Client
  static commands: object = {}

  constructor(options: TOptions) {
    this._options = {
      token: options?.token || '',
      prefix: options?.prefix || '',
      color: options?.color || 'GOLD',
      commandsPath: options?.commandsPath || resolve('src', 'commands'),
      intentsFlags: options?.intentsFlags || []
    }
    this.client = this.createClient()
    this.commandLoad()
    this.event()
  }

  public async start(): Promise<void> {
    try {
      await configLoad()
      await this.client.login(this._options.token || global.env.TOKEN)
    } catch (error) {
      console.log('!! ERROR-BOT ->', (error as Error).message)
    }
  }

  private createClient() {
    return new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ...this._options.intentsFlags]
    })
  }

  private event(): void {
    this.client.on('ready', () => console.log('>> BOT -> OK'))

    this.client.on('messageCreate', (message: Message) => {
      const { content } = new MessageProcessor(message)
      const response: BotResponse = new BotResponse(message, this._options.color)

      this.commandRun(content, response)
    })
  }

  private commandRun(content: TContent, response: BotResponse): void {
    const prefix = this._options.prefix || global.env.PREFIX || '$'

    if (content.prefix === prefix) {
      console.log('>> COMMAND-RUN -> ' + JSON.stringify(content))

      // create pack commands
      const commandsPack = {
        ...commandsDefault,
        ...Bot.commands
      }

      try {
        if (commandsPack[content.command]) {
          // Execute command dynamically
          commandsPack[content.command]({ content, response })
        } else throw new Error(`Incorrect commnad: "${content.command}"`)
      } catch (error) {
        response.general('❌ Comando Incorrecto')
        console.error('!! WARN-COMMAND-RUN ->', (error as Error).message)
      }
    }
  }

  private async commandLoad(): Promise<void> {
    // load commands from files
    const path = this._options.commandsPath
    const commandFiles = await fs.readdir(path)

    for (const file of commandFiles) {
      // Verify the name of the command files
      if (file.search(/[a-z0-9]*\.command\.js/) > -1) {
        const command = await import(resolve(path, file))
        // create commands object
        Bot.commands = { ...Bot.commands, ...command }
      }
    }
  }
}

export { Bot }
