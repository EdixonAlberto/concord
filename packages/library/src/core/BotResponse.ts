import { Message, MessageEmbed, EmbedFieldData, ColorResolvable, TextChannel } from 'discord.js'

class BotResponse {
  private channel: TextChannel
  private defaultColor: ColorResolvable

  constructor(channel: TChannel, color: ColorResolvable = 'GOLD') {
    this.channel = channel as TextChannel
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

    return await this.channel.send({
      embeds: [embed]
    })
  }

  public async general(response: string): Promise<TMessage> {
    return await this.channel.send(response)
  }

  public async direct(response: string): Promise<TMessage | undefined> {
    // TODO: encontrar la manera de hacer un reply desde otro canal
    const channel = this.channel as unknown as Message

    if (channel?.reply) return await channel.reply(response)
  }
}

export { BotResponse }
