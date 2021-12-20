export const ping: TCommand = async ({ content, response }): Promise<void> => {
  const dateMessage = content.message().createdTimestamp
  const dateNow = Date.now()

  const ping = dateNow - dateMessage

  response.general(`🛰️ Pong - duración: **${ping} ms**`)
}
