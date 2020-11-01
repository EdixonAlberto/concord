import scrapeIt from 'scrape-it';
import cheerio from 'cheerio';

const MOZILLA_URL: string = 'https://developer.mozilla.org';
const PROTOTYPE_LIST: string = 'Array|String|Object';

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
    let url: string = '';

    // the search is carried out
    searchList.forEach((search: TSearch) => {
      if (search.title.search(regex) > -1) url = search.url;
    });

    // the definition data is returned, otherwise the search list
    if (url) {
      const data = await ScrapeMozilla.getDefinition(url);
      return { data };
    } else return { searchList: '' };
  }

  private static async searchMethod(type: string, method: string): Promise<TSearch[]> {
    const { $ } = <{ $: cheerio.Selector }>(
      await scrapeIt(`${MOZILLA_URL}/es/search?q=prototype.${method}`, {})
    );

    const searchList = $('a.result-title')
      .map((i: number, _el: cheerio.Element) => {
        const el = $(_el);

        return {
          title: el.text(),
          url: MOZILLA_URL + el.attr('href')
        };
      })
      .get();

    return searchList;
  }

  private static async getDefinition(url: string): Promise<TDefinition> {
    const { data, $ } = <{ data: any; $: cheerio.Selector }>await scrapeIt(url, {
      example: {
        selector: 'pre.js code',
        texteq: 0
      },
      exampleUrl: {
        selector: 'iframe.interactive.interactive-js',
        attr: 'src'
      }
    });

    console.log(data);

    // const definition = $('p')
    //   .map((i: number, _el: cheerio.Element) => {
    //     const el = $(_el);

    //     const paragraph = el.text();
    //     if (paragraph !== '') return paragraph;
    //   })
    //   .get()[0];

    // let syntax: string = '';

    // syntax = $('pre.syntaxbox').text();
    // console.log('SYNTAX:', syntax);

    // const exampleList = $('pre')
    //   .map((i: number, _el: cheerio.Element) => {
    //     const el = $(_el);

    //     if (syntax && i === 1) return el.text();
    //     else {
    //       if (i === 0) syntax = el.text();
    //       // else if (i === 3) return el.text();
    //     }
    //   })
    //   .get();

    // const pre = $('pre.brush:', '#wikiArticle').text();
    // const example = exampleList.join('');

    return {
      definition: '',
      syntax: '',
      example: '',
      url
    };
  }
}

export { ScrapeMozilla };
