import { TCommand } from '@types';

export const ping = ({ content, response }: TCommand): void => {
  const dateMessage = content.message().createdTimestamp;
  const dateNow = Date.now();

  const latency = dateNow - dateMessage;
  const ping = (latency / 1000).toFixed(2);

  response.general(`🛰️ Pong - duración: **${ping} ms**`);
};
