module.exports.content = async ({ content, response }) => {
  const { prefix, command, params, message } = content

  const bot = message().channel.client.user.username

  response.embeded({
    header: 'CONTENT',
    body: [
      {
        title: 'prefix',
        content: prefix
      },
      {
        title: 'command',
        content: command
      },
      {
        title: 'params',
        content: JSON.stringify(params)
      },
      {
        title: 'bot',
        content: bot
      }
    ]
  })
}
