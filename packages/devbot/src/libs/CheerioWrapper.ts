import axios from 'axios';
import cheerio from 'cheerio';

class CheerioWrapper {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async load(path: string): Promise<cheerio.Root> {
    const { data } = await axios.get(`${this.baseUrl}/${path}`);
    const $ = cheerio.load(data);
    return $;
  }
}

export { CheerioWrapper };
