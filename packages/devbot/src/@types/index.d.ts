type TConfig = {
  discordToken: string;
  prefix: string;
};

type TCommandData = {
  name: string;
  command: string;
  description: string;
};

type TCommand = import('@edixon/concord').TCommand;

type TLang = 'js';

type TResponseMoz = {
  data?: TScrape;
  searchList?: TSearch[];
};

type TScrape = {
  method: string;
  definition: string;
  syntax: string;
  example: string;
  url: string;
};

type TSearch = {
  title: string;
  path: string;
};

type TResponseMime = {
  mime: TMime;
  source: string;
};

type TMime = {
  extension: string;
  typeDoc: string;
  typeMime: string;
};

type TCase = {
  name: string;
  description: string;
  example: string;
};

type TList =
  | string
  | {
      title: string;
      [key: string]: string;
    };

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
