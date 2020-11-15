import { commandDataList } from '~DATA/commandData';

export const help = ({ response }: TCommand): void => {
  const body = commandDataList.map((command: TCommandData) => {
    return {
      title: command.name,
      content: command.description
    };
  });

  response.embeded({
    header: 'HELP',
    title: 'Lista de Comandos',
    body
  });
};
