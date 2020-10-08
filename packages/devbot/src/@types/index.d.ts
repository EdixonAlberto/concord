type TConfig = {
  discordToken: string;
};

type TResponse = import('@edixon/concord').BotResponse;

type TContent = {
  prefix: string;
  command: import('@ENUM').commandsList;
  params: Array<string>;
  message: () => import('discord.js').Message;
};

/************************************ DECLARATIONS **************************************/

declare namespace NodeJS {
  interface Global {
    config: TConfig;
  }
}
