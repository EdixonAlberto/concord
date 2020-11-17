import { ScrapeMozilla } from '../modules/ScrapeMozilla';
import { Format } from '~HELP/Format';
import { getCommandData } from '~DATA/command.data';

const CMD = getCommandData('MIME');

export const mime = async ({ content, response }: TCommand): Promise<void> => {
  const ext = content.params[0];

  content.message().channel.client.user?.username;

  if (!ext) {
    response.embeded({
      header: '❔ HELP',
      title: CMD.name,
      body: [
        {
          title: 'Comando',
          content: CMD.command
        },
        {
          title: 'Descripción',
          content: CMD.description
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
      header: CMD.name,
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
