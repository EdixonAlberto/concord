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
    imageHeader,
    title,
    body,
    footer = '',
    color = this.defaultColor
  }: TEmbed): Promise<Message | undefined> {
    const embed = new MessageEmbed();

    if (typeof header === 'string') embed.setAuthor(header);
    else embed.setAuthor(header?.text, header?.img, header?.url);

    if (imageHeader) embed.setThumbnail(imageHeader);

    if (title) embed.setTitle(title);

    if (typeof body === 'string') embed.setDescription(body);
    else {
      const table: EmbedFieldData[] = body.map((field: TField) => ({
        name: field.title,
        value: field.content,
        inline: field.fieldType === 'column'
      }));

      embed.addFields(table);
    }

    if (typeof footer === 'string') embed.setFooter(footer);
    else embed.setFooter(footer?.text, footer?.img);

    embed.setColor(color);

    return await this.response.channel.send(embed);
  }

  public async general(response: string): Promise<Message> {
    return await this.response.channel.send(response, {
      code: false
    });
  }

  public async direct(response: string): Promise<Message> {
    return await this.response.reply(response, {
      code: false
    });
  }
}

export { BotResponse };
