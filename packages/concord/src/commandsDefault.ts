import { TCommand } from '@types';

export const ping = ({ content, response }: TCommand): void => {
  response.general('Pong!');
};
