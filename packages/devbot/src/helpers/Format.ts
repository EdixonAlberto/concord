class Format {
  public static code(code: string, lang: TLang | 'md' = 'md'): string {
    return `\`\`\`${lang}\n${code}\`\`\``;
  }

  public static list(elemList: TList[]): string {
    let itemList: string = '';

    elemList.forEach((elem: TList, i: number) => {
      itemList +=
        typeof elem === 'string' ? `${i + 1}- ${elem}\n` : `${i + 1}. ${elem.title}\n`;
    });

    return Format.code(itemList);
  }

  public static link(title: string, url: string): string {
    return `[${title}](${url})`;
  }
}

export { Format };
