export type TOptions = {
  prefix: string;
  token: string;
  commands: object;
};

export type TContent = {
  prefix: string;
  command: import('@ENUM').commandsList & string;
  params: Array<string>;
  message: () => import('discord.js').Message;
};

export type TCommand = {
  content: TContent;
  response: import('./BotResponse').BotResponse;
};

export type TEmbed = {
  header: string;
  title: string;
  detail: string | TTable;
  footer?: string;
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
