import { langList, colorsList } from '../enumerations';
import { Format } from '~HELP/Format';
import { ScrapeMozilla } from '../modules/ScrapeMozilla';

const header: string = '>DEV';

export const dev = async ({ content, response }: TCommand): Promise<void> => {
  const params = content.params as Array<TLang & string>;
  let lang: TLang,
    type: string = '',
    method: string = '';

  if (params.length === 3) [lang, type, method] = params;
  else if (params.length === 2) [lang, method] = params;
  else {
    response.embeded({
      header,
      title: 'Error',
      body: 'Parametros no encontrados `[extent] [type] [method]`',
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
      const { data, searchList } = await ScrapeMozilla.searchDefinition(type, method);
      scrape = data;
      searchs = searchList;
      break;

    default:
      if (['css', 'php'].includes(lang)) {
        response.general(`El lenguaje \`${lang}\` esta en desarrollo 🛠️`);
      } else {
        response.embeded({
          header,
          title: 'Error',
          body: `\`${lang}\` no es un lenguaje valido`,
          color: colorsList.error
        });
      }
      return;
  }

  if (scrape) sendResponse(response, title, scrape);
  else if (lang && searchs) {
    const resp = await response.embeded({
      header: {
        text: title,
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
      },
      title: `El método \`${type ? type + '.' + method : method}()\` no existe`,
      body: [
        {
          title: 'Lista de posibles metodos',
          content: Format.search(searchs),
          fieldType: 'row'
        }
      ],
      footer: 'Escriba un número para hacer una elección. Escriba "cancel" para salir',
      color: colorsList.javascript
    });

    const filter = (m: any) => {
      const nro: number = Number(m.content);
      return (!Number.isNaN(nro) && nro <= searchs!.length) || m.content === 'cancel';
    };

    const input = (await content.await(filter)).first();
    const text = input?.content;

    if (text) {
      if (text === 'cancel') return;
      else {
        const nro: number = Number(text) - 1;
        const path: string = searchs[nro].path;

        const scrape = await ScrapeMozilla.getDefinition(path);
        await sendResponse(response, title, scrape);
      }
    } else response.general('❌ Tiempo de espera terminado');

    await resp?.delete();
    input?.delete();
  }
};

async function sendResponse(
  response: TCommand['response'],
  title: string,
  scrape: TScrape
): Promise<void> {
  await response.embeded({
    header: {
      text: title,
      img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
    },
    title: `\`${scrape.method}()\``,
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
