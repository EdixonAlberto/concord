import { langList, colorsList } from '../enumerations';
import { Format } from '~HELP/Format';
import { ScrapeMozilla } from '../modules/ScrapeMozilla';

const HEADER: string = 'DEV';

export const dev = async ({ content, response }: TCommand): Promise<void> => {
  const params = content.params as Array<any>;
  let lang: TLang,
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
  let scrape: TScrape | undefined;
  let searchs: TSearch[] | undefined;

  switch (langList[lang]) {
    case langList.js:
      title = 'JavaScript';
      const { data, searchList } = await ScrapeMozilla.definition(type, method);
      scrape = data;
      searchs = searchList;
      break;

    default:
      response.embeded({
        header: 'DEV',
        title: 'Error',
        body: `\`${lang}\` no es un lenguaje valido`,
        color: colorsList.error
      });
      return;
  }

  if (scrape) {
    response.embeded({
      header: {
        text: title,
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
      },
      title: `\`${method}()\``,
      body: [
        {
          title: 'Definición',
          content: scrape.definition,
          fieldType: 'row'
        },
        {
          title: 'Sintaxis',
          content: Format.code(scrape.syntax, 'js'),
          fieldType: 'row'
        },
        {
          title: 'Ejemplo',
          content: Format.code(scrape.example, 'js'),
          fieldType: 'row'
        },
        {
          title: 'Fuente',
          content: `[developer.mozilla.org](${scrape.url})`,
          fieldType: 'row'
        }
      ],
      color: colorsList.javascript
    });
  }
  // } else if (lang && searchs) {
  //   response.embeded({
  //     header: {
  //       text: HEADER
  //     },
  //     title: 'Error',
  //     body: [
  //       {
  //         title: `El método \`${method}()\` no existe`,
  //         content: searchs,
  //         fieldType: 'row'
  //       }
  //     ],
  //     color: colorsList.error
  //   });
  // }
};
