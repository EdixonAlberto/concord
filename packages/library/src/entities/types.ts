import {
  IntentsBitField,
  ColorResolvable,
  Message,
  CollectorFilter,
  AwaitMessagesOptions,
  Collection,
  Client
} from 'discord.js'
import { BotResponse } from '~CORE/BotResponse'

export type TOptionsDefault = {
  token: string
  prefix: string
  color: ColorResolvable
  eventsPath: string
  commandsPath: string
  intentsFlags: number[]
}

export type TOptions = Partial<TOptionsDefault>

export const FLAGS = IntentsBitField.Flags

export type TMessage = Message<boolean>

export type TField = {
  title: string
  content: string
  fieldType?: 'row' | 'column'
}

export type TEmbed = {
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
  color?: ColorResolvable
}

export type TContent = {
  params: Array<string>
  message: () => TMessage
  await: (filter: CollectorFilter<unknown[]>, options?: AwaitMessagesOptions) => Promise<Collection<string, TMessage>>
}

export type TChannels = Map<string, BotResponse>

export type TParams = {
  client: Client
  content: TContent
  channels: TChannels
  response: BotResponse
}

export type TCommand = (params: TParams) => Promise<void>

export type TEvent = (params: { client: Client; channels: TChannels }) => Promise<void>
