import { langList, colorsList } from '../enumerations';
import { Format } from '~HELP/Format';
import { ScrapeMozilla } from '../modules/ScrapeMozilla';

const HEADER: string = 'DEV';

export const dev = async ({ content, response }: TCommand): Promise<void> => {
  const [lang, method] = content.params as [TLang, string];

  let title: string = '';
  let data: TDataDev | undefined;

  switch (langList[lang]) {
    case langList.js:
      title = 'JavaScript';
      data = await ScrapeMozilla.definition(method);
      break;

    default:
      response.embeded({
        header: HEADER,
        title: 'Error',
        detail: `\`${lang}\` no es un lenguaje valido`,
        color: colorsList.error
      });
      break;
  }

  if (data) {
    response.embeded({
      header: HEADER,
      title: `${title} \`${method}()\``,
      detail: [
        {
          title: 'Definición',
          content: `${data.definition}`,
          fieldType: 'row'
        },
        {
          title: 'Ejemplo',
          content: Format.code('js', data.example),
          fieldType: 'row'
        },
        {
          title: 'Fuente',
          content: data.url,
          fieldType: 'row'
        }
      ],
      footer: '',
      color: colorsList.javascript
    });
  } else {
    response.embeded({
      header: HEADER,
      title: 'Error',
      detail: [
        {
          title: `El metodo \`${method}()\` no existe`,
          content: Format.code(
            'md' as 'js',
            `
            Lista de markdouwn:
            - 1
            - 2
            - 3
          `
          ),
          fieldType: 'row'
        }
      ],
      color: colorsList.error
    });
  }
};
