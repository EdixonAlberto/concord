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
          content: mime.extension,
          fieldType: 'row'
        },
        {
          title: 'Tipo de Documento',
          content: mime.typeDoc,
          fieldType: 'row'
        },
        {
          title: 'Tipo de MIME',
          content: mime.typeMime,
          fieldType: 'row'
        },
        {
          title: 'Fuente',
          content: Format.link('developer.mozilla.org', data.source),
          fieldType: 'row'
        }
      ]
    });
  } else response.general('❌ medio no encontrado');
};
