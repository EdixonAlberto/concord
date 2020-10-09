export const wiki = ({ content, response }: TCommand): void => {
  const concept = (content.params[0] as string).toLowerCase();

  if (concept == 'linting') {
    response.general(
      `\`${concept.toUpperCase()}:\` Es el proceso de ejecutar un programa para analizar el código en busca de errores`
    );
  }
};
