import { Client, Message, Intents } from 'discord.js'
import { promises as fs } from 'fs'
import { resolve } from 'path'

import { BotResponse } from './BotResponse'
import { MessageProcessor } from './MessageProcessor'
import * as commandsDefault from './commandsDefault'
import { configLoad } from '~UTILS/config.util'
import { id, logger } from '~UTILS'
import { TOptionsDefault, TOptions, TContent } from '~ENTITIES/types'

class Bot {
  static client: Client
  private _options: TOptionsDefault
  private commands: object = {}
  private botID: string

  constructor(options?: TOptions) {
    this._options = {
      token: options?.token || '',
      prefix: options?.prefix || '',
      color: options?.color || 'GOLD',
      commandsPath: options?.commandsPath || resolve('src', 'commands'),
      intentsFlags: options?.intentsFlags || []
    }
    this.botID = id(true)
  }

  public async start(): Promise<void> {
    try {
      await configLoad()
      await this.createClient()
      await this.commandsLoad()
      this.eventsLoad()
      logger('BOT', `Instance "${this.botID}" create successfully`)
    } catch (error) {
      logger('ERROR-BOT', (error as Error).message)
    }
  }

  private async createClient(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      try {
        Bot.client = new Client({
          intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ...this._options.intentsFlags]
        })

        await Bot.client.login(this._options.token || global.env.TOKEN)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  private eventsLoad(): void {
    Bot.client.on('ready', () => {
      logger('BOT', `Bot logged in as ${Bot.client?.user?.tag}`)
    })

    Bot.client.on('messageCreate', (message: Message) => {
      const { content } = new MessageProcessor(message)
      const response: BotResponse = new BotResponse(message, this._options.color)

      this.commandRun(content, response)
    })
  }

  private commandRun(content: TContent, response: BotResponse): void {
    const prefix = this._options.prefix || global.env.PREFIX || '$'

    if (content.prefix === prefix) {
      logger('COMMAND-RUN', JSON.stringify(content), true)

      // create pack commands
      const commandsPack = {
        ...commandsDefault,
        ...this.commands
      }

      try {
        if (commandsPack[content.command]) {
          // Execute command dynamically
          commandsPack[content.command]({ content, response })
        } else throw new Error(`Incorrect commnad: "${content.command}"`)
      } catch (error) {
        response.general('❌ Comando Incorrecto')
        logger('COMMAND-RUN', (error as Error).message, true)
      }
    }
  }

  private async commandsLoad(): Promise<void> {
    // load commands from files
    const path = this._options.commandsPath
    const commandFiles = await fs.readdir(path)

    for (const file of commandFiles) {
      // Verify the name of the command files
      if (file.search(/[a-z0-9]*\.command\.js/) > -1) {
        const command = await import(resolve(path, file))
        // create commands object
        this.commands = { ...this.commands, ...command }
      }
    }
  }
}

export { Bot }
