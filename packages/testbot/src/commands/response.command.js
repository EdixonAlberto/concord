module.exports.response = async ({ _, response }) => {
  response.general('Message general')

  response.direct('Message direct')

  response.embeded({
    header: 'Message Embeded',
    title: 'Title',
    body: [
      {
        title: 'Title body 1',
        content: 'Content body 1'
      },
      {
        title: 'Title body 2',
        content: 'Content body 2'
      }
    ]
  })
}
