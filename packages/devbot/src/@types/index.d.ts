type TConfig = {
  discordToken: string;
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

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
