import scrapeIt from 'scrape-it';

const MOZILLA_URL: string = 'https://developer.mozilla.org';

class ScrapeMozilla {
  constructor() {}

  public static async definition(method: string) {
    const { url, sugestion } = await ScrapeMozilla.searchMethod(method);
    if (url) {
      const data = await ScrapeMozilla.getDefinition(url);
      return data;
    }
  }

  public static async getDefinition(url: string): Promise<TDataDev> {
    const { data } = <{ data: TResponseMoz['definition'] }>await scrapeIt(url, {
      definition: {
        selector: 'p',
        texteq: 1
      },
      example: {
        selector: 'pre.js'
      },
      exampleUrl: {
        selector: 'iframe.interactive.interactive-js',
        attr: 'src'
      }
    });

    if (data.exampleUrl) {
      const { data: dataExample } = <{ data: TResponseMoz['example'] }>(
        await scrapeIt(data.exampleUrl, {
          example: {
            selector: '#static-js'
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

  private static async searchMethod(method: string): Promise<TSearchResp> {
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

    const regex = new RegExp(`prototype\.${method}.*$`);

    return data.title.search(regex) > -1
      ? { url: data.url, sugestion: '' }
      : { url: '', sugestion: '' };
  }
}

export { ScrapeMozilla };
