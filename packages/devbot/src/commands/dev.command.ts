import { langList, colorsList } from '../enumerations';
import { Format } from '~HELP/Format';
import { ScrapeMozilla } from '../modules/ScrapeMozilla';
import { TTable } from '@edixon/concord';

const header: string = 'DEV';

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
      title: '❌ Error: `parámetros faltantes`',
      body: [
        {
          title: 'Comando',
          content: ` \`>dev [extent] [type?] [method]\`
- **extent:** Extensión del lenguaje de programación (js).
- **type:** (OPCIONAL) Tipo de método (array, string, object).
- **method:** Nombre del método.`
        },
        {
          title: 'Ejemplos',
          content: Format.code('>dev js array map\n>dev js map')
        }
      ],
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
      if (['css', 'php', 'py'].includes(lang)) {
        response.general(`🛠️ El lenguaje \`${lang}\` esta en desarrollo`);
      } else {
        response.embeded({
          header,
          title: '❌ Error: `lenguaje invalido`',
          body: `\`${lang}\` no es un lenguaje valido, ` + 'intente con `js`',
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
      title: `El método \`${type ? type + '.' + method : method}\` no existe`,
      body: [
        {
          title: 'Lista de posibles métodos',
          content: Format.search(searchs)
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
      console.log('>> INPUT ->', text);

      if (text !== 'cancel') {
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
  let body: TTable = [
    {
      title: 'Definición',
      content: scrape.definition
    },
    {
      title: 'Ejemplo',
      content: Format.code(scrape.example, 'js')
    },
    {
      title: 'Fuente',
      content: Format.link('developer.mozilla.org', scrape.url)
    }
  ];

  if (scrape.syntax) {
    body.splice(1, 0, {
      title: 'Sintaxis',
      content: Format.code(scrape.syntax, 'js')
    });
  }

  await response.embeded({
    header: {
      text: title,
      img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
    },
    title: `\`${scrape.method}\``,
    body,
    color: colorsList.javascript
  });
}
