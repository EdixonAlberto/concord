import { langList, colorsList } from '../enumerations';
import { Format } from '~HELP/Format';
import { ScrapeMozilla } from '../modules/ScrapeMozilla';

const HEADER: string = 'DEV';

export const dev = async ({ content, response }: TCommand): Promise<void> => {
  const params = content.params as Array<any>;
  let lang: TLang | string = '',
    type: string = '',
    method: string = '';

  if (params.length === 3) [lang, type, method] = params;
  else if (params.length === 2) [lang, method] = params;
  else {
    response.embeded({
      header: 'DEV',
      title: 'Error',
      body: 'Parametros no encontrados `[language, type, method]`',
      color: colorsList.error
    });
    return;
  }

  let title: string = '';
  let data: TDataDev | undefined;

  switch (langList[lang as TLang]) {
    case langList.js:
      title = 'JavaScript';
      data = await ScrapeMozilla.definition(type, method);
      break;

    default:
      response.embeded({
        header: 'DEV',
        title: 'Error',
        body: `\`${lang}\` no es un lenguaje valido`,
        color: colorsList.error
      });
      return;
    // break;
  }

  if (data) {
    response.embeded({
      header: {
        text: title,
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
      },
      title: `\`${method}()\``,
      body: [
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
          content: `[developer.mozilla.org](${data.url})`,
          fieldType: 'row'
        }
      ],
      color: colorsList.javascript
    });
  } else if (lang) {
    response.embeded({
      header: {
        text: HEADER
      },
      title: 'Error',
      body: [
        {
          title: `El método \`${method}()\` no existe`,
          content: Format.code(
            'md' as 'js',
            `Sugerencias:
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
