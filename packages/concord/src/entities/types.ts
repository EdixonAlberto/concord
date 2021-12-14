import { Intents } from 'discord.js'

export const FLAGS = Intents.FLAGS

export type TOptionsDefault = {
  token: string
  prefix: string
  color: TColor
  commandsPath: string
  intentsFlags: number[]
}

export type TOptions = Partial<TOptionsDefault>
