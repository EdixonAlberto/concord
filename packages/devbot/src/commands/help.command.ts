import { commandDataList } from '~DATA/command.data';

export const help = ({ response }: TCommand): void => {
  const body = commandDataList.map((command: TCommandData) => {
    return {
      title: command.name + '   ' + command.command,
      content: command.description
    };
  });

  response.embeded({
    header: '❔ HELP',
    title: 'Lista de Comandos',
    body
  });
};
