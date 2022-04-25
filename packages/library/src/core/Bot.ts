import { Intents, Client, Message } from 'discord.js'
import { promises as fs } from 'fs'
import { resolve } from 'path'

import { BotResponse } from '~CORE/BotResponse'
import { MessageProcessor } from '~CORE/MessageProcessor'
import * as commandsDefault from '~CORE/commandsDefault'
import { ChannelsProcessor } from '~CORE/ChannelsProcessor'
import { logger, configLoad, getConfig } from '~UTILS'
import { TOptionsDefault, TOptions, TEvent, TContent, TCommand } from '~ENTITIES/types'

class Bot {
  private static client: Client
  private static token: string
  private static prefix: string
  private _options: TOptionsDefault
  private events!: Record<string, TEvent>
  private commands!: Record<string, TCommand>
  // private botID: string

  constructor(options?: TOptions) {
    this._options = {
      token: options?.token || '',
      prefix: options?.prefix || '',
      color: options?.color || 'GOLD',
      eventsPath: options?.eventsPath || resolve('dist', 'events'),
      commandsPath: options?.commandsPath || resolve('dist', 'commands'),
      intentsFlags: options?.intentsFlags || []
    }
    // this.botID = id(true)
  }

  public async start(): Promise<void> {
    try {
      await configLoad()

      Bot.token = this._options.token || getConfig().TOKEN
      Bot.prefix = this._options.prefix || getConfig().PREFIX

      await this.createClient()
      await this.eventsLoad()
      await this.commandsLoad()

      // logger('BOT', `Instance ${this.botID} created successfully`)
      logger('BOT', `Listening prefix ${Bot.prefix}`)

      this.eventsListen()
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

        client.login(Bot.token)
        Bot.client = client

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  private async eventsLoad(): Promise<void> {
    // Load events from files
    const path = this._options.eventsPath
    // TODO: mejorar array de eventos para obtenerlos desde discord
    const eventsFiles = ['ready', 'messageCreate']

    for (const file of eventsFiles) {
      try {
        // Import event file
        const evtPath = resolve(path, `${file}.event.js`)
        const event = (await import(evtPath)) as Record<string, TEvent>
        // Create events object
        this.events = { ...this.events, ...event }
      } catch (_) {}
    }
  }

  private async commandsLoad(): Promise<void> {
    // load commands from files
    const path = this._options.commandsPath
    const commandFiles = await fs.readdir(path)

    // Load message commands
    for (const file of commandFiles) {
      // Verify the name of the command files
      if (file.search(/[a-z0-9]*\.command\.js/i) > -1) {
        const cmdPath = resolve(path, file)
        const command = (await import(cmdPath)) as Record<string, TCommand>
        // Create commands object
        this.commands = { ...this.commands, ...command }
      }
    }
  }

  private eventsListen(): void {
    Bot.client.on('ready', (client: Client) => {
      logger('BOT', `Logged as ${client.user!.tag}`)

      const content = { event: 'ready' } as TBotContent
      const channels = ChannelsProcessor.cache(Bot.client.channels.cache)

      this.commandRun({ client, content, channels })
    })

    Bot.client.on('messageCreate', (message: Message) => {
      const client = message.client
      const { content } = new MessageProcessor(message)
      const channels = ChannelsProcessor.cache(Bot.client.channels.cache)
      const response: BotResponse = new BotResponse(message.channel, this._options.color)

      this.commandRun({ client, content, channels, response })
    })
  }

  private commandRun(params: TBotParams): void {
    const content = params.content

    if (content.event) {
      const event = content.event

      if (event !== 'messageCreate' || content.message().author.tag !== params.client.user!.tag) {
        logger('EVENT', event)

        try {
          if (this.events[event]) {
            // Execute event dynamically
            this.events[event]({ client: params.client, channels: params.channels })
          } else throw new Error(`Incorrect event: "${event}"`)
        } catch (_) {}
      }
    }

    if (content.command && content.prefix === Bot.prefix) {
      logger('COMMAND', JSON.stringify(content), true)

      // Create pack commands
      const commandsPack = {
        ...commandsDefault,
        ...this.commands
      }

      try {
        const command = content.command

        if (commandsPack[command]) {
          // Prepare content to the commands
          const contentCommand: TContent = {
            params: content.params,
            await: content.await,
            message: content.message
          }

          // Execute command dynamically
          commandsPack[command]({ content: contentCommand, response: params.response, channels: params.channels })
        } else throw new Error(`Incorrect commnad: "${command}"`)
      } catch (error) {
        params.response!.general('❌ Comando Incorrecto')
        logger('COMMAND', (error as Error).message, true)
      }
    }
  }
}

export { Bot }
