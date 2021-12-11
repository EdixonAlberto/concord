import { Intents } from 'discord.js'

export const FLAGS = Intents.FLAGS

export type TOptions = {
  token: string
  prefix: string
  color?: TColor
  commandsPath?: string
  intentsFlags?: number[]
}
