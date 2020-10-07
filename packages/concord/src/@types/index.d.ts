type TOptions = {
  prefix: string;
  token: string;
};

type TContent = {
  prefix: string;
  command: import('@ENUM').commandsList;
  params: Array<string>;
  message: () => import('discord.js').Message;
};

type TEmbed = {
  header: string;
  title: string;
  detail: string | TTable;
  footer?: string;
  color?: string;
};

type TTable = Array<TField>;

type TField = {
  title: string;
  content: string;
  fieldType: 'row' | 'column';
};

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {}
}
