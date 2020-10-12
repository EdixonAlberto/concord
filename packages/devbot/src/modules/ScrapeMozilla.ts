import scrapeIt from 'scrape-it';

const MOZILLA_URL: string = 'https://developer.mozilla.org';

class ScrapeMozilla {
  constructor() {}

  public static async getMethod(method: string) {
    const { url } = await ScrapeMozilla.search(method);
    const result = ScrapeMozilla.definition(url);

    return result;
  }

  private static async search(method: string): Promise<{ url: string }> {
    const { data } = <{ data: TResponseMoz['search'] }>(
      await scrapeIt(`${MOZILLA_URL}/es/search?q=prototype.${method}`, {
        title: {
          selector: 'a.result-title',
          texteq: 0
        },
        url: {
          selector: 'a.result-title',
          attr: 'href'
        }
      })
    );
    console.log(data);

    return data.title.search(/prototype\.toLocaleLowerCase.*$/) > -1 ? data : { url: '' };
  }

  private static async definition(path: string): Promise<TDataDev> {
    let example = '';

    const { data } = <{ data: TResponseMoz['definition'] }>(
      await scrapeIt(`${MOZILLA_URL}/${path}`, {
        definition: {
          selector: 'p',
          texteq: 1
        },
        example: {
          selector: 'pre.js'
        },
        url: {
          selector: 'iframe.interactive.interactive-js',
          attr: 'src'
        }
      })
    );
    console.log(data);

    example = data.example;

    if (data.url) {
      const { data: dataExample } = <{ data: TResponseMoz['example'] }>(
        await scrapeIt(data.url, {
          example: {
            selector: '#static-js'
          }
        })
      );
      example = dataExample.example;
    }

    return {
      definition: data.definition,
      example
    };
  }
}

export { ScrapeMozilla };
