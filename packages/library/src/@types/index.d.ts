type TNodeEnv = 'production' | 'development'

type TEnv = {
  TOKEN?: string
  PREFIX?: string
  MODE_DEV: boolean
}

type TCommandList = 'ping' | string

type TChannel = TMessage['channel'] | import('discord.js').Channel

type TMessage = import('~ENTITIES/types').TMessage

type TCommand = import('~ENTITIES/types').TCommand

type TParams = import('~ENTITIES/types').TParams

// DECLARATIONS ________________________________________________________________________________________________________

declare var env: TEnv
