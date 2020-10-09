type TConfig = {
  discordToken: string;
};

type TCommand = import('@edixon/concord').TCommand;

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
