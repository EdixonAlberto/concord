export const commandDataList: TCommandData[] = [
  //   {
  //     name: 'WIKI',
  //     description: `\`>wiki [word]\`
  // Muestra la definición de una palabra sobre programación.
  // - **word:** Palabra que se quiere definir`
  //   },
  {
    name: 'DEV',
    command: '`>dev [extent] [type?] [method]`',
    description: `Muestra la definición, la sintaxis y un ejemplo sobre un método en el lenguaje de programación ingresado.
- **extent:** Extensión del lenguaje de programación (js, php, py, etc).
- **type:** (OPCIONAL) Tipo de método (array, string, object).
- **method:** Nombre del método.`
  },
  {
    name: 'MIME',
    command: '`>mime [extent]`',
    description: `Muestra una descripción del tipo de medio MIME introducido
- **extent:** Extensión del tipo de medio (pdf, word, js, json, etc)`
  },
  {
    name: 'ABOUT',
    command: '`>about`',
    description: 'Muestra información del creador y una breve descripción del bot'
  }
];

export const getCommandData = (commandName: string): TCommandData => {
  return commandDataList.find(command => command.name === commandName) as TCommandData;
};
