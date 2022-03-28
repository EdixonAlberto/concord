import { Message, MessageEmbed, EmbedFieldData, ColorResolvable, TextChannel } from 'discord.js'
import { TEmbed, TField } from '~ENTITIES/types'

class BotResponse {
  private channel: TextChannel
  private defaultColor: ColorResolvable

  constructor(channel: TBotChannel, color: ColorResolvable = 'GOLD') {
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

    if (typeof header === 'string') embed.setAuthor({ name: header })
    else embed.setAuthor({ name: header.text, iconURL: header?.img, url: header?.url })

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

    if (typeof footer === 'string') embed.setFooter({ text: footer })
    else embed.setFooter({ text: footer.text, iconURL: footer?.img })

    embed.setColor(color)

    return await this.channel.send({
      embeds: [embed]
    })
  }

  public async general(response: string): Promise<TBotMessage> {
    return await this.channel.send(response)
  }

  public async direct(response: string): Promise<TBotMessage | undefined> {
    // TODO: encontrar la manera de hacer un reply desde otro canal
    const channel = this.channel as unknown as Message

    if (channel?.reply) return await channel.reply(response)
  }
}

export { BotResponse }
