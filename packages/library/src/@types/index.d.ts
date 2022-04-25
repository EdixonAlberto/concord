type TNodeEnv = 'production' | 'development'

type TConfig = {
  TOKEN: string
  PREFIX: string
  MODE_DEV: boolean
}

// TODO: mejorar este type
type TCommandList = 'ping' | string

type TBotChannel = TMessage['channel'] | import('discord.js').Channel

type TBotMessage = import('~ENTITIES/types').TMessage

type TBotContent = import('~ENTITIES/types').TContent & {
  prefix: string
  event: string
  command: TCommandList
}

type TBotParams = {
  client: import('discord.js').Client
  content: TBotContent
  channels: import('~ENTITIES/types').TChannels
  response?: import('~CORE/BotResponse').BotResponse
}
