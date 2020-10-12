type TConfig = {
  discordToken: string;
};

type TCommand = import('@edixon/concord').TCommand;

type TLang = 'js';

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
