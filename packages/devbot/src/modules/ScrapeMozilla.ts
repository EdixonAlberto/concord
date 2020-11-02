import { CheerioWrapper } from '../libs/CheerioWrapper';

const MOZILLA_URL: string = 'https://developer.mozilla.org';
const PROTOTYPE_LIST: string = 'Array|String|Object';

const cheerio = new CheerioWrapper(MOZILLA_URL);

class ScrapeMozilla {
  constructor() {}

  public static async definition(
    type: string = '',
    method: string
  ): Promise<TResponseMoz> {
    const searchList = await ScrapeMozilla.searchMethod(type, method);

    // creating regex to search
    const regex = new RegExp(
      `^(${type || PROTOTYPE_LIST})\\.prototype\\.${method}\\(\\)$`
    );
    let path: string = '';

    // the search is carried out
    searchList.forEach((search: TSearch) => {
      if (search.title.search(regex) > -1) path = search.path;
    });

    // the definition data is returned, otherwise the search list
    if (path) {
      const data = await ScrapeMozilla.getDefinition(path);
      return { data };
    } else return { searchList };
  }

  private static async searchMethod(type: string, method: string): Promise<TSearch[]> {
    const $ = await cheerio.load(`/es/search?q=prototype.${method}`);

    const searchList = $('a.result-title')
      .map((i: number, _el: cheerio.Element) => {
        const el = $(_el);

        return {
          title: el.text(),
          path: el.attr('href')
        };
      })
      .get();

    return searchList;
  }

  private static async getDefinition(path: string): Promise<TScrape> {
    const $ = await cheerio.load(path);

    const definition = $('p')
      .map((i: number, _el: cheerio.Element) => {
        const el = $(_el);

        const paragraph = el.text();
        if (paragraph !== '') return paragraph;
      })
      .get()[0];

    const el = $('h2#Syntax').text() ? $('h2#Syntax').next() : $('h2#Sintaxis').next();
    const syntax = $(el).text();

    const example = $('pre.js').eq(0).text();

    return {
      definition,
      syntax,
      example,
      url: MOZILLA_URL + path
    };
  }
}

export { ScrapeMozilla };
