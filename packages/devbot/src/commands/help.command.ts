export const help = ({ response }: TCommand): void => {
  response.embeded({
    header: 'HELP',
    title: 'Lista de Comandos',
    body: [
      //       {
      //         title: '`>wiki [word]`',
      //         content: `Muestra la definición de una palabra sobre programación.
      // - **word:** Palabra que se quiere definir`
      //       },
      {
        title: 'DEV',
        content: `\`>dev [extent] [type?] [method]\`
Muestra (definición, sintaxis, ejemplo) sobre un método en el lenguaje de programación ingresado.
- **extent:** Extensión del lenguaje de programación (js, php, py, etc).
- **type:** (OPCIONAL) Tipo de método (array, string, object).
- **method:** Nombre del método.`
      },
      {
        title: 'ABOUT',
        content:
          '`>about`\nMuestra información del creador y una breve descripción del bot'
      },
      {
        title: 'MIME',
        content: `\`>mime [extent]\`
Muestra una descripción del tipo de medio MIME introducido
- **extent:** Extensión del tipo de medio (pdf, word, js, json, etc)`
      }
    ]
  });
};
