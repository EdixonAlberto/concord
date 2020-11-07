export const help = ({ response }: TCommand): void => {
  response.embeded({
    header: 'HELP',
    title: 'Lista de Comandos',
    body: [
      {
        title: '`>wiki [word]`',
        content:
          'Muestra la definición de una palabra sobre programación.\n' +
          '- **word:** Palabra que se quiere definir',
        fieldType: 'row'
      },
      {
        title: '`>dev [extent] [type?] [method]`',
        content:
          'Muestra (definición, sintaxis, ejemplo) sobre un método en el lenguaje de programación ingresado.\n' +
          '- **extent:** Extensión del lenguaje de programación (js, php, py, ...).\n' +
          '- **type (opcional):** Tipo de método (array, string, object).\n' +
          '- **method:** Nombre del método.',
        fieldType: 'row'
      }
    ]
  });
};
