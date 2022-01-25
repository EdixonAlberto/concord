import { Collection, Channel } from 'discord.js'
import { BotResponse } from '~CORE/BotResponse'
import { TChannels } from '~ENTITIES/types'

class ChannelsProcessor {
  public static cache(channelsCache: Collection<string, Channel>) {
    const channels: TChannels = new Map()

    channelsCache.forEach((channel: TChannel) => {
      channels.set(channel.id, new BotResponse(channel))
    })

    return channels
  }
}

export { ChannelsProcessor }
