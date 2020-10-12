class Format {
  public static code(lang: TLang, code: string): string {
    return `\`\`\`${lang}\n${code}\`\`\``;
  }
}

export { Format };
