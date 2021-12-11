import { Client, Message, Intents } from 'discord.js'
import { promises as fs } from 'fs'
import { resolve } from 'path'

import { BotResponse } from './BotResponse'
import { MessageProcessor } from './MessageProcessor'
import * as commandsDefault from './commandsDefault'
import { configLoad } from './utils/configLoad'
import { TOptions } from './types'

class Bot {
  private _options: TOptions
  private client: Client
  static commands: object = {}

  constructor(options: TOptions) {
    this._options = options
    this.client = this.createClient()
  }

  public async start(): Promise<void> {
    try {
      await configLoad()
      await this.client.login(this._options?.token || global.env.TOKEN)
      this.commandLoad()
      this.event()
    } catch (error) {
      console.log('!! ERROR-BOT ->', (error as Error).message)
    }
  }

  private createClient() {
    const flags = this._options?.intentsFlags || []

    return new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ...flags]
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
    const prefix = this._options.prefix || global.env.PREFIX

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

  private async commandLoad(commandsPath?: string): Promise<void> {
    // load commands from files
    const path = commandsPath || resolve('src', 'commands')
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
