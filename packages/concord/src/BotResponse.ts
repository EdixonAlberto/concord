import { Message, MessageEmbed } from 'discord.js';
import { colorsList } from '@ENUM';
import { TEmbed, TField } from '@types';

class BotResponse {
  private response: Message;

  constructor(message: Message) {
    this.response = message;
  }

  public embeded({
    header,
    title,
    detail,
    footer = '',
    color = colorsList.ok
  }: TEmbed): void {
    const embed = new MessageEmbed();
    embed.setAuthor(header).setTitle(title).setFooter(footer).setColor(color);

    if (typeof detail === 'string') embed.setDescription(detail);
    else {
      const table = detail.map((field: TField) => ({
        name: field.title,
        value: field.content,
        inline: field.fieldType === 'column'
      }));

      embed.addFields(table);
    }
    this.response.channel.send(embed);
  }

  public general(response: string): void {
    this.response.channel.send(response, {
      code: false
    });
  }

  public direct(response: string): void {
    this.response.reply(response, {
      code: false
    });
  }
}

export { BotResponse };
