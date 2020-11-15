import { ScrapeMozilla } from '../modules/ScrapeMozilla';
import { Format } from '~HELP/Format';
import { getCommandData } from '~DATA/commandData';

const COMMAND = getCommandData('MIME');

export const mime = async ({ content, response }: TCommand): Promise<void> => {
  const ext = content.params[0];

  content.message().channel.client.user?.username;

  if (!ext) {
    response.embeded({
      header: COMMAND.name,
      title: '❌ Error: `parámetros faltantes`',
      body: [
        {
          title: 'Comando',
          content: COMMAND.description
        },
        {
          title: 'Ejemplo',
          content: Format.code('>mime json')
        }
      ]
    });
    return;
  }

  const data = await ScrapeMozilla.getMime(ext);

  if (data) {
    const mime = data.mime;

    response.embeded({
      header: COMMAND.name,
      title: `Descripción del medio \`${ext}\``,
      body: [
        {
          title: 'Extension',
          content: mime.extension
        },
        {
          title: 'Tipo de Documento',
          content: mime.typeDoc
        },
        {
          title: 'Tipo de MIME',
          content: mime.typeMime
        },
        {
          title: 'Fuente',
          content: Format.link('developer.mozilla.org', data.source)
        }
      ]
    });
  } else response.general('❌ tipo de medio invalido');
};
