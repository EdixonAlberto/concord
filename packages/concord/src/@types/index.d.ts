import {
  Message,
  CollectorFilter,
  AwaitMessagesOptions,
  Collection,
  ColorResolvable,
  Intents
} from 'discord.js';

export type TColor = ColorResolvable;

export type TOptions = {
  token: string;
  prefix: string;
  color?: TColor;
  commandsPath?: string;
  intentsFlags: Intents.FLAGS[];
};

export type TCommandList = import('entities/enums').commandsList & string;

export type TContent = {
  prefix: string;
  command: TCommandList;
  params: Array<string>;
  message: () => Message;
  await: (
    filter: CollectorFilter,
    options?: AwaitMessagesOptions
  ) => Promise<Collection<string, Message>>;
};

export type TCommand = {
  content: TContent;
  response: import('BotResponse').BotResponse;
};

export type TEmbed = {
  header:
    | string
    | {
        text: string;
        img?: string;
        url?: string;
      };
  imageHeader?: string;
  title?: string;
  body: string | TField[];
  footer?:
    | string
    | {
        text: string;
        img?: string;
      };
  color?: TColor;
};

export type TField = {
  title: string;
  content: string;
  fieldType?: 'row' | 'column';
};

/************************************ DECLARATIONS **************************************/

// declare var
