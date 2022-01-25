import { Client, Intents } from 'discord.js'
import { promises as fs } from 'fs'
import { resolve } from 'path'

import { BotResponse } from './BotResponse'
import { MessageProcessor } from './MessageProcessor'
import * as commandsDefault from './commandsDefault'
import { id, logger, configLoad } from '~UTILS'
import { TOptionsDefault, TOptions } from '~ENTITIES/types'
import { ChannelsProcessor } from '~CORE/ChannelsProcessor'

class Bot {
  private readonly MESSAGE_CMD_FILE = 'message.command.js'
  private static client: Client
  private static token: string
  private static prefix: string
  private static tag: string
  private _options: TOptionsDefault
  private commands: { message?: TCommand } = {}
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

      Bot.token = this._options.token || global.env?.TOKEN || ''
      Bot.prefix = this._options.prefix || global.env?.PREFIX || '$'

      await this.createClient()
      await this.commandsLoad()
      this.eventsLoad()

      logger('BOT', `Instance ${this.botID} created successfully`)
      logger('BOT', `Listening prefix ${Bot.prefix}`)
    } catch (error) {
      logger('ERROR-BOT', (error as Error).message)
    }
  }

  private async createClient(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = new Client({
          intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, ...this._options.intentsFlags]
        })

        await client.login(Bot.token)

        client.on('ready', () => {
          Bot.client = client
          Bot.tag = client!.user!.tag
          logger('BOT', `Logged in as ${Bot.tag}`)
          resolve(true)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  private async commandsLoad(): Promise<void> {
    // load commands from files
    const path = this._options.commandsPath
    const messageCmdPath = resolve(path, this.MESSAGE_CMD_FILE)
    const commandFiles = await fs.readdir(path)

    try {
      await fs.access(messageCmdPath)
      this.commands.message = (await import(messageCmdPath)) as TCommand
    } catch (_) {}

    // Load message commands
    for (const file of commandFiles) {
      // Verify the name of the command files
      if (file.search(/[a-z0-9]*\.command\.js/i) > -1) {
        const command = await import(resolve(path, file))
        // create commands object
        this.commands = { ...this.commands, ...command }
      }
    }
  }

  private eventsLoad(): void {
    Bot.client.on('messageCreate', (message: TMessage) => {
      const { content } = new MessageProcessor(message)
      const response: BotResponse = new BotResponse(message.channel, this._options.color)
      const channels = ChannelsProcessor.cache(Bot.client.channels.cache)

      this.commandRun({ content, response, channels })
    })
  }

  private commandRun({ content, response, channels }: TParams): void {
    if (content.prefix === Bot.prefix) {
      logger('COMMAND', JSON.stringify(content), true)

      // create pack commands
      const commandsPack = {
        ...commandsDefault,
        ...this.commands
      }

      try {
        if (commandsPack[content.command]) {
          // Execute command dynamically
          commandsPack[content.command]({ content, response, channels })
        } else throw new Error(`Incorrect commnad: "${content.command}"`)
      } catch (error) {
        response.general('❌ Comando Incorrecto')
        logger('COMMAND', (error as Error).message, true)
      }
    }

    // Run command message
    if (this.commands.message) {
      const messageAuthor = content.message().author.tag

      if (messageAuthor !== Bot.tag) {
        this.commands.message({ content, response, channels })
      }
    }
  }
}

export { Bot }