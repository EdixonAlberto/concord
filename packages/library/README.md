# Concord

<div align="center">
  <img src="https://github.com/EdixonAlberto/concord/raw/dev/images/discord-bots.png" alt="discord bots" width="60%" style="border-radius: 15px;" />
</div>

[![](https://img.shields.io/badge/author-Edixon_Piña-green?style=for-the-badge)](https://edixonalberto.com)
[![](https://img.shields.io/npm/v/@edixon/concord?color=CB0000&style=for-the-badge)](https://npmjs.com/package/@edixon/concord)
[![](https://img.shields.io/npm/dt/@edixon/concord?color=8956FF&style=for-the-badge)](https://npmjs.com/package/@edixon/concord)

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
const { Bot } = require('@edixon/concord')
new Bot().start()
```

## Command File

Create file in location: `./src/commands` with the following format: `[commandName].command.js`. Concord will
automatically convert each file into executable commands.

![command-file](https://github.com/EdixonAlberto/concord/raw/dev/images/command-files.png)

You can also indicate the spefecific path where you want to save your commands, for example with typescript you should
point to the path "outDir" indicated in the `tsconfig.json` file.

```ts
import { Bot } from '@edixon/concord'

const bot = new Bot({
  commandsPath: './dist/commands'
})
```

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

export const commandName: TCommand = async ({ content, response }): Promise<void> => {
  // code
}
```

Concord contains a default command called `"ping"` to test the connection with the bot.

![command-ping](https://github.com/EdixonAlberto/concord/raw/dev/images/command-ping.png)

lastly, if you create a command called `message.command.js`, all messages sent by users will be received here except
those sent by the same bot.

```js
module.exports.message = async ({ content: { message } }) => {
  console.log(message().content)
}
```

## Parameters

### 1. Response

- `general [Function]`: Send a general message

- `direct [Function]`: Send a direct message to the user whon

- `embeded [Function]`: Send an embeded message

Command File:

`src/commands/responde.command.js`

```js
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

Result:

![response](https://github.com/EdixonAlberto/concord/raw/dev/images/response.png)

### 2. Content

- `prefix [String]`: Contains the prefix set when creating the bot.

- `command [String]`: Contains the name of the commnand used.

- `params [Array]`: Contains a list od messages sent after the command name. Only one should be used to separate
  messages.

- `message [Function]`: Return an object containing the "message" instance with all the properties described in the
  Message class of discord.js.

Command File:

`src/commands/content.command.js`

```js
module.exports.content = async ({ content, response }) => {
  const { prefix, command, params, message } = content

  const messageContent = message().content
  const bot = message().channel.client.user.username

  response.embeded({
    header: 'CONTENT',
    body: [
      {
        title: 'content',
        content: messageContent
      },
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
```

Result:

![content](https://github.com/EdixonAlberto/concord/raw/dev/images/content.png)

## License

[MIT](https://github.com/EdixonAlberto/concord/blob/main/LICENSE) &copy; Edixon Piña
