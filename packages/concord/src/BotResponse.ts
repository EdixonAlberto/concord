import { Message, MessageEmbed, EmbedFieldData } from 'discord.js'

class BotResponse {
  private response: Message
  private defaultColor: TColor

  constructor(message: Message, color: TColor = 'GOLD') {
    this.response = message
    this.defaultColor = color
  }

  public async embeded({
    header = '',
    imageHeader,
    title,
    body,
    footer = '',
    color = this.defaultColor
  }: TEmbed): Promise<Message | undefined> {
    const embed = new MessageEmbed()

    if (typeof header === 'string') embed.setAuthor(header)
    else embed.setAuthor(header.text, header?.img, header?.url)

    if (imageHeader) embed.setThumbnail(imageHeader)

    if (title) embed.setTitle(title)

    if (typeof body === 'string') embed.setDescription(body)
    else {
      const table: EmbedFieldData[] = body.map((field: TField) => ({
        name: field.title,
        value: field.content,
        inline: (field.fieldType || 'row') === 'column'
      }))

      embed.addFields(table)
    }

    if (typeof footer === 'string') embed.setFooter(footer)
    else embed.setFooter(footer.text, footer?.img)

    embed.setColor(color)

    return await this.response.channel.send({
      embeds: [embed]
    })
  }

  public async general(response: string): Promise<Message> {
    return await this.response.channel.send(response)
  }

  public async direct(response: string): Promise<Message> {
    return await this.response.reply(response)
  }
}

export { BotResponse }
