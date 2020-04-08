import { App, ButtonAction, LogLevel, directMention, BlockButtonAction, MessageEvent } from '@slack/bolt'
import { asCodedError } from '@slack/bolt/dist/errors'
import { UsersInfoResponse } from './types.s'
import { getChannel, getMe } from './store'
import { errorDescription } from './utils'
import { messages } from './messages'
import { copy } from './helpers'

const app: App = new App({
  authorize: () => {
    return Promise.resolve({
      botId: '<Add Your BOT ID>',
      botToken: process.env.SLACK_BOT_TOKEN,
      userToken: process.env.SLACK_USER_TOKEN,
    })
  },
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
})

app.action('escalate_button', async ({ ack, action, context }) => {
  ack()

  const buttonAction: ButtonAction = action as ButtonAction
  type permalink = { permalink: string }
  const actionData = JSON.parse(buttonAction.value)
  const { getPermalink, postMessage } = app.client.chat

  // * Call the chat.getPermalink method with a token
  let permalink
  // * say() method only posts a message to the same channel, so you need to call the method
  try {
    permalink = await getPermalink({
      // * The token you used to initialize your app is stored in the `context` object
      token: context.botToken,
      channel: actionData.channel,
      message_ts: actionData.ts,
    })
    await postMessage({
      // * The token you used to initialize your app is stored in the `context` object
      token: context.botToken,
      channel: 'REPLACE_WITH_SLACK_CHANNEL',
      text: `<@${actionData.user}> has excalated an issue \n ${permalink.permalink}`,
      unfurl_links: true,
    })
  } catch (error) {
    errorDescription(error)
  }
})

let incidentOpenMessage: any = undefined

app.action('incident_ack', async ({ body, ack, say, context }) => {
  const button: BlockButtonAction = body as BlockButtonAction
  const { message } = button
  ack()
  if (!message) {
    return
  }
  if (!incidentOpenMessage) {
    say('This incident was already acknowledged.')
    return
  }

  const blocksIncidentAck = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Incidents*\n\nThe incident was resolved by <@${body.user.id}>. :tada:`,
      },
    },
  ]

  if (body.channel) {
    await app.client.chat.update({
      text: 'Incident acknowledged',
      ts: message.ts,
      channel: body.channel.id,
      blocks: blocksIncidentAck,
      token: context.botToken,
    })

    await app.client.reactions.add({
      name: 'white_check_mark',
      channel: body.channel.id,
      timestamp: incidentOpenMessage,
      token: context.botToken,
    })
    incidentOpenMessage = undefined
  }
})

/* 
########################### MESSAGES ########################### 
################################################################
*/

app.message('happy', async ({ message, context }) => {
  try {
    await app.client.reactions.add({
      token: context.botToken,
      name: 'grinning',
      channel: message.channel,
      timestamp: message.ts,
    })
    await app.client.reactions.add({
      token: context.botToken,
      name: 'star',
      channel: message.channel,
      timestamp: message.ts,
    })
  } catch (error) {
    errorDescription(error)
  }
})

app.message('hi', async ({ message, say }) => {
  const { channel, ts, user } = message

  const message_blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ':wave: Hello, you posted a message. What do you need?',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Do a task',
        },
        value: JSON.stringify({ ts: ts, channel: channel, user: user }),
        action_id: 'action_taken',
      },
    },
  ]

  // * Respond to the message with a button
  say({
    text: `Ewok is a dog!`,
    blocks: message_blocks,
  })
})

app.message('have a soda', directMention(), async ({ context, say }) => {
  // * Initialize conversation
  const conversation = context.conversation !== undefined ? context.conversation : {}

  // * Initialize data for this listener
  conversation.sodasHad = conversation.sodasHad !== undefined ? conversation.sodasHad : 0

  if (conversation.sodasHad > 4) {
    say("I'm too fizzy...")
    return
  }

  say('Sure!')
  conversation.sodasHad += 1
  try {
    await context.updateConversation(conversation)
  } catch (error) {
    console.error(error)
  }
})

app.message('sleep it off', directMention(), async ({ context, say }) => {
  try {
    await context.updateConversation({ ...context.conversation, sodasHad: 0 })
    say('zzzzz')
  } catch (error) {
    console.error(error)
  }
})

app.message('game', async ({ say }) => {
  // const { channel, ts, user } = message save for later

  const message_blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ':soccer:The next game is *Sunday, September 29th.*',
      },
      accessory: {
        type: 'image',
        image_url: 'https://ssl.gstatic.com/onebox/media/sports/logos/7spurne-xDt2p6C0imYYNA_96x96.png',
        alt_text: 'palm tree',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'They are playing *International.*',
      },
      accessory: {
        type: 'image',
        image_url: 'https://ssl.gstatic.com/onebox/media/sports/logos/OWVFKuHrQuf4q2Wk0hEmSA_96x96.png',
        alt_text: 'plants',
      },
    },
  ]

  // * Respond to the message with the next game
  say({
    text: 'wats up?',
    blocks: message_blocks,
  })
})

// * Responding a message containing a red circle emoji
app.message(':red_circle:', async ({ message, say }) => {
  const { channel, ts, user } = message

  const message_blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Hello, you posted a message with a :red_circle: - Did you want to escalate?',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'HELL YES',
        },
        value: JSON.stringify({ ts: ts, channel: channel, user: user }),
        action_id: 'escalate_button',
      },
    },
  ]

  // * Respond to the message with a button
  say({
    text: 'HELla YES',
    blocks: message_blocks,
  })
})

/*
########################### COMMANDS ########################### 
###############################################################
*/

app.command(
  '/echo',
  async ({ command, ack, say }): Promise<void> => {
    // * Acknowledge command request
    ack()
    say(`You said "${command.text}"`)
  },
)

/*
###############################################################
########################### EVENTS ########################### 
###############################################################
*/

app.event('app_mention', async ({ event, say, context }) => {
  try {
    const res: UsersInfoResponse = await app.client.users.info({
      token: context.botToken,
      user: event.user,
    })

    if (res.ok) {
      if (res.user) {
        say({
          text: `Hi! <@${res.user.name}>`,
        })
      }
    }
  } catch (reason) {
    errorDescription(reason)
  }
})

app.event('member_joined_channel', async ({ event, say }) => {
  const channel = getChannel()
  const user = event.user

  // * check if our Bot user itself is joining the channel
  if (user === getMe() && channel) {
    const message: any = copy(messages.welcome_channel)
    // * fill in placeholder values with channel info
    if (!message.blocks[0]) {
      message.blocks[0].text.text = message.blocks[0].text.text
        .replace('{{channelName}}', channel.name)
        .replace('{{channelId}}', channel.id)
    }
    say(message)
  }
})

app.event('reaction_added', async ({ event, context }) => {
  // * only react to ⚡ (:zap:) emoji
  // * const events: ReactionAddedEvent = event as ReactionAddedPayload;
  // * let event: ReactionAddedEvent;'

  if (event.reaction === 'zap') {
    const { channel, ts } = event.item as MessageEvent

    // * get a permalink for this message
    const permalink = await app.client.chat.getPermalink({
      token: context.botToken,
      message_ts: ts,
      channel: channel,
    })

    // * get user info of user who reacted to this message
    const user: any = await app.client.users.info({
      token: context.botToken,
      user: event.user,
    })

    const name = `<@${user.user.id}>`
    const channelGot = getChannel()

    // * post this message to the configured channel
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: channelGot && channelGot.id,
      text: name + ' wants you to see this message: ' + permalink.permalink,
      unfurl_links: true,
      unfurl_media: true,
    })
    // * formatting the user's name to mention that user in the message (see: https://api.slack.com/messaging/composing/formatting)
  }
})

app.event('reaction_added', async ({ context, event }) => {
  // * only react to a certain emoji. :frowning: for example
  if (event.reaction === 'frowning') {
    // * const channelId = event.item.channel;
    // * const ts = event.item.ts;
    const channelGot = getChannel()
    const user: any = await app.client.users.info({
      token: context.botToken,
      user: event.user,
    })

    const name = `<@${user.user.id}>`
    const message_blocks = [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'This is a plain text section block.',
          emoji: true,
        },
      },
    ]

    await app.client.chat.postMessage({
      token: context.botToken,
      channel: channelGot && channelGot.id,
      text: name + ' wants you to see this message: ',
      blocks: message_blocks,
      unfurl_links: true,
      unfurl_media: true,
    })
    // say({
    //   text: 'This is a plain text section block.',
    //   blocks: message_blocks,
    // })
  }
})

/*
########################### Start App ########################### 
*/

if (process.env.NODE_ENV !== 'production') {
  ;(async (PORT = 3000) => {
    try {
      await app.start(process.env.PORT || PORT)
    } catch (error) {
      throw error
    }

    console.log(`> Template Bolt is running on PORT ${PORT} in ${process.env.NODE_ENV}`)
  })()
}

app.error((error): any => {
  try {
    console.error('As Codeded Error', asCodedError(error))
  } catch (error) {
    throw `Something went wrong ${error}`
  }
})

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

process.on('uncaughtException', function (err) {
  console.error(err.stack)
  process.exit(1)
})

process.on('unhandledRejection', function (reason) {
  console.error('Unhandled rejection', reason)
})

export default app
