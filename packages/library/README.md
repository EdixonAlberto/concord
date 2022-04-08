# Concord

<div align="center">
  <img src="https://github.com/EdixonAlberto/concord/raw/dev/images/discord-bots.png" alt="discord bots" width="60%" style="border-radius: 15px;" />
</div>

[![](https://img.shields.io/badge/author-Edixon_Piña-yellow?style=for-the-badge)](https://github.com/EdixonAlberto/)
[![](https://img.shields.io/npm/v/@edixon/concord?color=CB0000&style=for-the-badge)](https://npmjs.com/package/@edixon/concord)
[![](https://img.shields.io/npm/dt/@edixon/concord?color=CB0000&style=for-the-badge)](https://npmjs.com/package/@edixon/concord)

[![](https://img.shields.io/badge/types-TypeScript-blue?style=for-the-badge)](https://github.com/microsoft/TypeScript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

Framework of Node.js to create Discord bots. With Concord you can create Discord bots quickly and easily. 🚀

Created with Node.js and TypeScript, all types are exposed for use. &nbsp;
<img src="https://github.com/EdixonAlberto/monorepo-css-battle/raw/main/.github/img/typescript.png" width="20px" alt="Logo typescript" /> +
💗

## Installation

```sh
npm install @edixon/concord
```

## Create an Bot

Create an instance of a bot.

```js
// src/index.js
const { Bot } = require('@edixon/concord')

const bot = new Bot({
  token: 'DISCORD_TOKEN',
  prefix: '$'
  // ...
})

bot.start()
```

You can also create the bot by passing the necessary values through environments variables.

In project root create an file `.env`

```
TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx.xxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx
PREFIX=$
```

Then with only 2 lines of code you can have the bot runrring.

```js
// src/index.js
const { Bot } = require('@edixon/concord')
new Bot().start()
```

## Command File

Create file in location: `./src/commands` with the following format: `[commandName].command.js`. Concord will
automatically convert each file into executable commands. The same logic must be followed to create events.

![command-file](https://github.com/EdixonAlberto/concord/raw/dev/images/command-files.png)

You can also indicate the spefecific path where you want to save your commands, for example with typescript you should
point to the path "outDir" indicated in the `tsconfig.json` file.

```ts
// src/index.ts
import { Bot } from '@edixon/concord'

const bot = new Bot({
  commandsPath: './dist/commands',
  eventsPath: './dist/events'
})
```

> Note: by default the paths will be in `'./dist/commands'` and `./dist/events` respectively.

> Note: in future versions these routes will be calculated dynamically through the `tsconfig.json` file

## Create Commands

Commnad files can be interpreted as commands as long as they export a function with the command name.

- javascript

```js
module.exports.commandName = async ({ content, response }) => {
  // code
}
```

- typescript

```ts
import { TCommand } from '@edixon/concord'

export const commandName: TCommand = async ({ content, response }) => {
  // code
}
```

Concord contains a default command called `"ping"` to test the connection with the bot.

![command-ping](https://github.com/EdixonAlberto/concord/raw/dev/images/command-ping.png)

## Create Events

To create events the steps are the same as for the commands, for example the "ready" event of discord.js is executed
when the bot starts, for this the following file is created

```ts
import { TEvent } from '@edixon/concord'

export const ready: TEvent = async ({ channels }) => {
  const channel = channels.get('957760027102112828') // server log channel id
  channel?.general('Bot started')
}
```

## Parameters

Each command file in Concord comes with a series of parameters injected from the framework to facilitate the handling of
input data, server information and the bot's response.

> Note: In future versions the number of parameters will be increased by adding variables with server information and
> methods that perform repetitive tasks

`module.exports.commandName = async (...params) => { }`

### 1. Client

Instance with all the properties described in the "Client" class of discord.js.

### 2. Content

- `params [Array]`: Contains a list od messages sent after the command name. Only one should be used to separate
  messages.

- `message [Function]`: Return an object containing the message instance with all the properties described in the
  "Message" class of discord.js.

```js
// src/commands/content.command.js
module.exports.content = async ({ content, response }) => {
  const { params, message } = content

  const messageContent = message().content
  const bot = message().channel.client!.user!.username

  response.embeded({
    header: 'CONTENT',
    body: [
      {
        title: 'content',
        content: messageContent
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
```

### 3. Channels

All server channels will be contained in the Channels parameter.

```ts
// src/commands/channels.command.js
module.exports.channels = async ({ channels }) => {
  const channel = channels.get('923073690920744990') // some id of a server channel

  if (channel) {
    await channel.general('Channels')
  }
}
```

### 4. Response

- `general [Function]`: Send a general message

- `direct [Function]`: Send a direct message to the user whon

- `embeded [Function]`: Send an embeded message

```js
// src/commands/responde.command.js
module.exports.response = async ({ response }) => {
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
```

## License

[MIT](https://github.com/EdixonAlberto/concord/blob/main/LICENSE) &copy; Edixon Piña
