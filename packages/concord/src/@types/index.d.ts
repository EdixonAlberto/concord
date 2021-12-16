type TNodeEnv = 'production' | 'development'

type TEnv = {
  TOKEN: string
  PREFIX: string
  MODE_DEV: boolean
}

type TCommandList = 'ping' | string

type TCommand = import('~ENTITIES/types').TCommand

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
