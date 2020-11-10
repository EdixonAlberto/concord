import { Message, CollectorFilter, AwaitMessagesOptions, Collection } from 'discord.js';

export type TOptions = {
  token: string;
  prefix: string;
  color?: string;
  commandsPath?: string;
};

export type TCommandsList = import('@ENUM').commandsList & string;

export type TContent = {
  prefix: string;
  command: TCommandsList;
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
        text?: string;
        img?: string;
        url?: string;
      };
  imageHeader?: string;
  title?: string;
  body: string | TTable;
  footer?:
    | string
    | {
        text?: string;
        img?: string;
      };
  color?: string;
};

export type TTable = Array<TField>;

export type TField = {
  title: string;
  content: string;
  fieldType: 'row' | 'column';
};

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {}
}
