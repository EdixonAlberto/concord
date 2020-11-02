class Format {
  public static code(code: string, lang: TLang | 'md' = 'md'): string {
    return `\`\`\`${lang}\n${code}\`\`\``;
  }
}

export { Format };
