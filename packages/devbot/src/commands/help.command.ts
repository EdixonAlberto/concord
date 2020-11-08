export const help = ({ response }: TCommand): void => {
  response.embeded({
    header: 'HELP',
    title: 'Lista de Comandos',
    body: [
      //       {
      //         title: '`>wiki [word]`',
      //         content: `Muestra la definición de una palabra sobre programación.
      // - **word:** Palabra que se quiere definir`,
      //         fieldType: 'row'
      //       },
      {
        title: '`>dev [extent] [type?] [method]`',
        content: `Muestra (definición, sintaxis, ejemplo) sobre un método en el lenguaje de programación ingresado.
- **extent:** Extensión del lenguaje de programación (js, php, py, ...).
- **type:** (OPCIONAL) Tipo de método (array, string, object).
- **method:** Nombre del método.`,
        fieldType: 'row'
      },
      {
        title: '`>about`',
        content: 'Muestra información del creador y una breve descripción del bot',
        fieldType: 'row'
      }
    ]
  });
};
