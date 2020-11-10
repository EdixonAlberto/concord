export type TOptions = {
  token: string;
  prefix: string;
  color?: string;
  commands?: object;
};

export type TContent = {
  prefix: string;
  command: import('@ENUM').commandsList & string;
  params: Array<string>;
  message: () => import('discord.js').Message;
  await: (
    filter: import('discord.js').CollectorFilter,
    options?: import('discord.js').AwaitMessagesOptions
  ) => Promise<import('discord.js').Collection<string, import('discord.js').Message>>;
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
