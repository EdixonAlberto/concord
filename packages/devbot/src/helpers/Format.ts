class Format {
  public static code(code: string, lang: TLang | 'md' = 'md'): string {
    return `\`\`\`${lang}\n${code}\`\`\``;
  }

  public static search(searchList: TSearch[]): string {
    let itemList: string = '';

    searchList.forEach((search: TSearch, i: number) => {
      itemList += `${i + 1}. ${search.title} \n`;
    });

    return Format.code(itemList);
  }

  public static link(title: string, url: string): string {
    return `[${title}](${url})`;
  }
}

export { Format };
