export const help = ({ response }: TCommand): void => {
  response.embeded({
    header: 'HELP',
    title: 'Lista de Comandos',
    body: [
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
    ]
  });
};
