import { BotResponse } from '@edixon/concord/src';
import { colorsList } from '../enumerations';

export const help = (content: TContent, response: BotResponse) => {
  response.embeded({
    header: 'HELP',
    title: 'Lista de Comandos',
    detail: [
      {
        title: '`>help`',
        content: 'Muestra la lista de comandos disponibles',
        fieldType: 'row'
      },
      {
        title: '`>wiki [word]`',
        content: 'Muestra la definición de una palabra sobre programación',
        fieldType: 'row'
      }
    ],
    color: colorsList.ok
  });
};
