import scrapeIt from 'scrape-it';
import { langList } from '@ENUM';

const local = (): any => {
  return {
    header: 'JAVASCRIPT',
    title: 'map()',
    detail: [
      {
        title: 'Definición',
        content:
          'El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.',
        fieldType: 'row'
      },
      {
        title: 'Ejemplo',
        content: `\`\`\`js
const animals = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
  { id: 3, type: 'cat' }
];

const cats = animals.map((animal, index) => {
  if (animal.name === 'cat') return animal;
});

console.log(cats);
/*
output:
[
  { id: 1, type: 'cat' },
  { id: 3, type: 'cat' }
]
*/
\`\`\``,
        fieldType: 'row'
      }
    ],
    color: '#ffff'
  };
};

const scrapeMozilla = async (lang: TLang, func: string) => {
  const url_docs_mozilla = 'https://developer.mozilla.org/es/docs/Web';
  const object = 'Array';

  const { data } = <{ data: { definition: string; url: string } }>(
    await scrapeIt(
      `${url_docs_mozilla}/${langList[lang]}/Referencia/Objetos_globales/${object}/${func}`,
      {
        definition: {
          selector: 'p',
          texteq: 1
        },
        example: {
          selector: 'pre.js',
          texteq: 1
        }
      }
    )
  );

  console.log(data);
};

const scrapeSearchMoz = async (search: string): any => {
  const { data } = await scrapeIt(
    `https://developer.mozilla.org/es/search?q=prototype.${search}`,
    {
      data: {
        selector: 'body'
      }
    }
  );

  console.log(data);
};

export const dev = ({ content, response }: TCommand): void => {
  const [lang, func] = content.params;

  scrapeSearchMoz(lang);

  // const resp = scrapeMozilla(lang as TLang, func);

  // test response
  // const resp = local();
  // response.embeded(resp);
};
