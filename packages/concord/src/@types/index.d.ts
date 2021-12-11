type TNodeEnv = 'production' | 'development'

type TEnv = {
  TOKEN: string
  PREFIX: string
  FLAGS: number[]
}

type TColor = import('discord.js').ColorResolvable

type TCommandList = import('~ENUMS').commandsList & string

type TContent = {
  prefix: string
  command: TCommandList
  params: Array<string>
  message: () => import('discord.js').Message
  await: (
    filter: import('discord.js').CollectorFilter<unknown[]>,
    options?: import('discord.js').AwaitMessagesOptions
  ) => Promise<import('discord.js').Collection<string, import('discord.js').Message>>
}

type TCommand = {
  content: TContent
  response: import('BotResponse').BotResponse
}

type TField = {
  title: string
  content: string
  fieldType?: 'row' | 'column'
}

type TEmbed = {
  header:
    | string
    | {
        text: string
        img?: string
        url?: string
      }
  imageHeader?: string
  title?: string
  body: string | TField[]
  footer?:
    | string
    | {
        text: string
        img?: string
      }
  color?: TColor
}

// DECLARATIONS ________________________________________________________________________________________________________

declare var env: TEnv
