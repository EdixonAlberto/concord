import { langList, colorsList } from '../enumerations';
import { Format } from '../helpers';
import { ScrapeMozilla } from '../modules/ScrapeMozilla';

const HEADER: string = 'DEV';

export const dev = async ({ content, response }: TCommand): Promise<void> => {
  const [lang, method] = content.params;
  let title: string = '';
  let data: TDataDev;
  console.log(data);

  if (langList[lang as TLang]) {
    switch (lang as TLang) {
      case 'js':
        title = 'JavaScript';
        data = await ScrapeMozilla.getMethod(method);
        break;

      default:
        break;
    }

    if (data) {
      response.embeded({
        header: HEADER,
        title: `${title} \`${method}()\``,
        detail: [
          {
            title: 'Definición',
            content: `${data.definition}`,
            fieldType: 'row'
          },
          {
            title: 'Ejemplo',
            content: Format.code('js', data.example),
            fieldType: 'row'
          }
        ],
        color: colorsList.javascript
      });
    } else {
      response.embeded({
        header: HEADER,
        title: 'Error',
        detail: `El metodo \`${method}()\` no existe`,
        color: colorsList.error
      });
    }
  } else {
    response.embeded({
      header: HEADER,
      title: 'Error',
      detail: `\`${lang}\` no es un lenguaje valido`,
      color: colorsList.error
    });
  }
};
