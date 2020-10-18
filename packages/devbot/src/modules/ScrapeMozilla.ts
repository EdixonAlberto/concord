import scrapeIt from 'scrape-it';

const MOZILLA_URL: string = 'https://developer.mozilla.org';
const PROTOTYPE_LIST: string = 'Array|String';

class ScrapeMozilla {
  constructor() {}

  public static async definition(type: string, method: string) {
    const { url, sugestion } = await ScrapeMozilla.searchMethod(type, method);
    if (url) {
      const data = await ScrapeMozilla.getDefinition(url);
      return data;
    }
  }

  public static async getDefinition(url: string): Promise<TDataDev> {
    const { data, $ } = <{ data: TResponseMoz['definition']; $: any }>(
      await scrapeIt(url, {
        definition: {
          selector: 'p',
          texteq: 1
        },
        example: {
          selector: 'pre.js code',
          texteq: 0
        },
        exampleUrl: {
          selector: 'iframe.interactive.interactive-js',
          attr: 'src'
        }
      })
    );

    if (data.exampleUrl) {
      const { data: dataExample } = <{ data: TResponseMoz['example'] }>(
        await scrapeIt(data.exampleUrl, {
          example: {
            selector: '#static-js'
          }
        })
      );
      data.example = dataExample.example;
    } else if (!data.example) {
      const { data: dataExample } = <{ data: TResponseMoz['example'] }>(
        await scrapeIt(url, {
          example: {
            selector: 'pre.js',
            texteq: 0
          }
        })
      );
      data.example = dataExample.example;
    }

    return {
      definition: data.definition,
      sintaxis: '',
      example: data.example,
      url
    };
  }

  private static async searchMethod(type: string, method: string): Promise<TSearchResp> {
    const { data } = <{ data: TResponseMoz['search'] }>(
      await scrapeIt(`${MOZILLA_URL}/es/search?q=prototype.${method}`, {
        title: {
          selector: 'a.result-title',
          texteq: 0
        },
        url: {
          selector: 'a.result-title',
          attr: 'href',
          convert(path) {
            return MOZILLA_URL + path;
          }
        }
      })
    );

    const regex = new RegExp(
      `(${type || PROTOTYPE_LIST})\\.prototype\\.${method}\\(\\)$`
    );

    return data.title.search(regex) > -1
      ? { url: data.url, sugestion: '' }
      : { url: '', sugestion: '' };
  }
}

export { ScrapeMozilla };
