import { Intents, ColorResolvable, Message, CollectorFilter, AwaitMessagesOptions, Collection } from 'discord.js'
import { BotResponse } from '~CORE/BotResponse'

export const FLAGS = Intents.FLAGS

export type TOptionsDefault = {
  token: string
  prefix: string
  color: ColorResolvable
  commandsPath: string
  intentsFlags: number[]
}

export type TOptions = Partial<TOptionsDefault>

export type TMessage = Message<boolean>

export type TContent = {
  prefix: string
  command: TCommandList
  params: Array<string>
  message: () => TMessage
  await: (filter: CollectorFilter<unknown[]>, options?: AwaitMessagesOptions) => Promise<Collection<string, TMessage>>
}

export type TChannels = Map<string, BotResponse>

export type TParams = {
  content: TContent
  response: BotResponse
  channels: TChannels
}

export type TCommand = (params: TParams) => Promise<void>
