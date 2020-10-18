type TConfig = {
  discordToken: string;
};

type TCommand = import('@edixon/concord').TCommand;

type TLang = 'js';

type TResponseMoz = {
  definition: {
    definition: string;
    sintaxis?: string;
    example: string;
    exampleUrl: string;
  };
  example: {
    example: string;
  };
  search: {
    title: string;
    url: string;
  };
};

type TDataDev = {
  definition: string;
  sintaxis: string;
  example: string;
  url: string;
};

type TSearchResp = {
  url: string;
  sugestion: string;
};

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
