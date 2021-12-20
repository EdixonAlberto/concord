import { Intents, ColorResolvable, Message, CollectorFilter, AwaitMessagesOptions, Collection } from 'discord.js'
import { BotResponse } from '../BotResponse'

export const FLAGS = Intents.FLAGS

export type TOptionsDefault = {
  token: string
  prefix: string
  color: ColorResolvable
  commandsPath: string
  intentsFlags: number[]
}

export type TOptions = Partial<TOptionsDefault>

export type TContent = {
  prefix: string
  command: TCommandList
  params: Array<string>
  message: () => Message
  await: (filter: CollectorFilter<unknown[]>, options?: AwaitMessagesOptions) => Promise<Collection<string, Message>>
}

export type TParams = {
  content: TContent
  response: BotResponse
}

export type TCommand = (params: TParams) => Promise<void>
