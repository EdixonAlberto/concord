type TConfig = {
  discordToken: string;
};

type TCommand = import('@edixon/concord').TCommand;

type TLang = 'js';

type TResponseMoz = {
  definition: {
    definition: string;
    example: string;
    url: string;
  };
  example: {
    example: string;
  };
  search: {
    title: string;
    url: string;
  };
};

type TDataDev =
  | {
      definition: string;
      example: string;
    }
  | undefined;

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
