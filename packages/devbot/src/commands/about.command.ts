export const about = async ({ content, response }: TCommand): Promise<void> => {
  response.embeded({
    header: '📃 ABOUT',
    imageHeader:
      'https://raw.githubusercontent.com/EdixonAlberto/monorepo-discord-bots/master/.github/avatar-devbot.png',
    body: [
      {
        title: 'Sobre DevBot',
        content: `DevBot es un chat bot para **discord** creado con la finalidad de ayudar a los desarrolladores en el ámbito de la **programación**, tanto para iniciantes como experimentados.

El bot esta preparado para obtener **definiciones, sintaxis y ejemplos de código** en varios lenguajes de programación, obteniendo la información directamente de la documentación oficial de cada lenguaje.

Pronto se irán incorporando **mas herramientas** que ayuden con el desarrollo de software.`
      },
      {
        title: 'Sobre mi',
        content: `Mi nombre es Edixon Piña, soy Ingeniero Electrónico en Computación y actualmente me dedico a tiempo completo como desarrollador de software.
- **Sitio Web:** [www.edixonalberto.com](https://www.edixonalberto.com/)
- **Github:** [EdixonAlberto](https://github.com/EdixonAlberto)`
      }
    ]
  });
};
