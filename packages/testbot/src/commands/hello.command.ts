import { TCommand } from '@edixon/concord'

export const hello: TCommand = async ({ response }) => {
  response.general('Message general')
}
