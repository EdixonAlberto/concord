import { Message, MessageEmbed, EmbedFieldData } from 'discord.js';
import { TEmbed, TField } from '@types';

class BotResponse {
  private response: Message;
  private defaultColor: string;

  constructor(message: Message, color: string = '') {
    this.response = message;
    this.defaultColor = color;
  }

  public async embeded({
    header,
    title,
    body,
    footer = '',
    color = this.defaultColor
  }: TEmbed): Promise<void> {
    const embed = new MessageEmbed();

    embed.setTitle(title).setColor(color);

    if (typeof header === 'string') embed.setAuthor(header);
    else embed.setAuthor(header?.text, header?.img, header?.url);

    if (typeof footer === 'string') embed.setFooter(footer);
    else embed.setFooter(footer?.text, footer?.img);

    if (typeof body === 'string') embed.setDescription(body);
    else {
      const table: EmbedFieldData[] = body.map((field: TField) => ({
        name: field.title,
        value: field.content,
        inline: field.fieldType === 'column'
      }));

      embed.addFields(table);
    }

    await this.response.channel.send(embed);
  }

  public async general(response: string): Promise<void> {
    await this.response.channel.send(response, {
      code: false
    });
  }

  public async direct(response: string): Promise<void> {
    await this.response.reply(response, {
      code: false
    });
  }
}

export { BotResponse };
