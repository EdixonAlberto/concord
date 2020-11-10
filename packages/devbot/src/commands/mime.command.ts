import { ScrapeMozilla } from '../modules/ScrapeMozilla';
import { Format } from '~HELP/Format';

export const mime = async ({ content, response }: TCommand): Promise<void> => {
  const ext = content.params[0];

  const data = await ScrapeMozilla.getMime(ext);

  if (data) {
    const mime = data.mime;

    response.embeded({
      header: 'MIME',
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
  } else response.general('❌ medio no encontrado');
};
