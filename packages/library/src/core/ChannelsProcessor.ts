import { Collection, AnyChannel } from 'discord.js'
import { BotResponse } from '~CORE/BotResponse'
import { TChannels } from '~ENTITIES/types'

class ChannelsProcessor {
  public static cache(channelsCache: Collection<string, AnyChannel>) {
    const channels: TChannels = new Map()

    channelsCache.forEach((channel: TBotChannel) => {
      channels.set(channel.id, new BotResponse(channel))
    })

    return channels
  }
}

export { ChannelsProcessor }
