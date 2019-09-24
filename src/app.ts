import { App, LogLevel, directMention } from '@slack/bolt';
import * as WebApi from 'seratch-slack-types/web-api';

const app: App = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.INFO,
});

import { ErrorCode } from '@slack/web-api';

type SlackError = {
  code: string;
  data: object;
};

function errorDescription(error: SlackError): void {
  if (error.code === ErrorCode.RequestError) {
    // Some other error, oh no!
    console.log('ErrorCode.RequestError ', error.data);
  } else if (error.code === ErrorCode.PlatformError) {
    console.log('ErrorCode.PlatformError', error.data);
  } else if (error.code === ErrorCode.HTTPError) {
    // Some other error, oh no!
    console.log('ErrorCode.HTTPError ', error.data);
  } else {
    console.error('Well that was unexpected! ', error);
  }
}

/*
###############################################################


########################### ACTIONS ########################### 


###############################################################
*/

app.action('button_click', ({ action, ack, body, say }) => {
  ack();
  say(`<@${body.user.id}> clicked the ${action.type}`);
});

app.action('action_taken', ({ action, ack, body, say }) => {
  console.log('TCL: action', action);
  console.log('the body', body);

  ack();
  say(`<@${body.user.id}> clicked the  ${action.type}`);
});

// The middleware will be called every time an interactive component with the action_id “escalate_yes" is triggered
app.action('escalate_yes', async ({ context, action, ack, say }) => {
  console.log(action);

  // Acknowledge action request
  ack();

  const actionData = JSON.parse(action.type);

  // Call the chat.getPermalink method with a token

  const result = await app.client.chat.getPermalink({
    // The token you used to initialize your app is stored in the `context` object
    token: context.botToken,
    channel: actionData.channel,
    message_ts: actionData.ts,
  });

  console.log(result.permalink);

  // say() method only posts a message to the same channel, so you need to call the method

  const post = await app.client.chat.postMessage({
    // The token you used to initialize your app is stored in the `context` object
    token: context.botToken,
    channel: 'CMPLZD6S3',
    text: `<@${actionData.user}> has excalated an issue \n ${result.permalink}`,
    unfurl_links: true,
  });
});

/*
################################################################


########################### MESSAGES ########################### 


################################################################
*/

// const response = await web.users.info({ user: "..." });
app.message('happy', async ({ message, context }) => {
  try {
    const result = await app.client.reactions.add({
      token: context.botToken,
      name: 'grinning',
      channel: message.channel,
      timestamp: message.ts,
    });
    const response = await app.client.reactions.add({
      token: context.botToken,
      name: 'star',
      channel: message.channel,
      timestamp: message.ts,
    });
    console.log('reactions.add result & response:', result, response);
  } catch (error) {
    errorDescription(error);
  }
});

app.message('42', ({ message, context }) => {
  // use chat.postMessage over say method
  try {
    const response = app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      text: 'The answer to life, the universe and everything',
      thread_ts: message.ts,
    });
    console.log('response from postMessage', response);
  } catch (reason) {
    console.error(`Failed because ${reason}`);
  }
});

app.message('hello', ({ message, say }) => {
  say({
    text: `Ewok is a dog!`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click',
        },
      },
    ],
  });
});

app.message('hi', async ({ message, say }) => {
  console.log(message);
  const { channel, ts, user } = message;

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
  ];

  // Respond to the message with a button
  say({
    text: `Ewok is a dog!`,
    blocks: message_blocks,
  });
});

app.message('knock knock', ({ message, say }) => {
  say(`_Who's there?_`);
});

/* Conversation context not loaded: Conversation not found
context 1 undefined
//   console.log("context 0", context[0]);
//   console.log("context 1", context[1]);
*/

app.message(/open the (.*) doors/i, ({ say, context }) => {
  const doorType = context.matches[0];

  const text = doorType === 'pod bay' ? 'I’m afraid I can’t let you do that.' : `Opening ${doorType} doors`;

  say(text);
});

const answer = 'HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING';

app.message('what is the answer to the ultimate question of life', directMention(), ({ say }) => {
  if (answer) {
    say(`${answer}, but what is the question?`);
  }
});

app.message('have a soda', directMention(), async ({ context, say }) => {
  // Initialize conversation
  const conversation = context.conversation !== undefined ? context.conversation : {};

  // Initialize data for this listener
  conversation.sodasHad = conversation.sodasHad !== undefined ? conversation.sodasHad : 0;

  if (conversation.sodasHad > 4) {
    say("I'm too fizzy...");
    return;
  }

  say('Sure!');
  conversation.sodasHad += 1;
  try {
    await context.updateConversation(conversation);
  } catch (error) {
    console.error(error);
  }
});

app.message('sleep it off', directMention(), async ({ context, say }) => {
  try {
    await context.updateConversation({ ...context.conversation, sodasHad: 0 });
    say('zzzzz');
  } catch (error) {
    console.error(error);
  }
});

app.message('Palmeiras game', async ({ message, say }) => {
  console.log(message);
  const { channel, ts, user } = message;

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
  ];

  // Respond to the message with the next game
  say({
    text: 'wats up?',
    blocks: message_blocks,
  });
});

// *** Responding a message containing a red circle emoji ***
app.message(':red_circle:', async ({ message, say }) => {
  console.log(message);
  const { channel, ts, user } = message;

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
        action_id: 'escalate_yes',
      },
    },
  ];

  // Respond to the message with a button
  say({
    text: 'HELla YES',
    blocks: message_blocks,
  });
});

/*
###############################################################


########################### COMMANDS ########################### 


###############################################################
*/

app.command('/echo', async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();
  say(`You said "${command.text}"`);
});

/*
###############################################################


########################### EVENTS ########################### 


###############################################################
*/

app.event('app_mention', async ({ event, say, context }) => {
  console.log('event: ', event.user);
  try {
    const res: WebApi.UsersInfoResponse = await app.client.users.info({
      token: context.botToken,
      user: event.user,
    });

    if (res.ok) {
      if (res.user) {
        say({
          text: `Hi! <@${res.user.name}>`,
        });
      }
    }
  } catch (reason) {
    console.error(`Failed because ${reason}`);
  }
});

const enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you'];
const leaveReplies = ['Are you still there?', 'Target lost', 'Searching'];

const randomEnterReply = () => enterReplies[Math.floor(Math.random() * enterReplies.length)];
const randomLeaveReply = () => leaveReplies[Math.floor(Math.random() * leaveReplies.length)];

app.event('member_joined_channel', ({ event, say }) => {
  console.log('this is the event', event);
  say({ text: randomEnterReply() });
});
app.event('member_left_channel', ({ say }) => say(randomLeaveReply()));

// app.event("reaction_added", async ({ event, say }) => {
//   // only react to a certain emoji. :frowning: for example
//   if (event.reaction === "frowning") {
//     // const channelId = event.item.channel;
//     // const ts = event.item.ts;
//     const message_blocks = [
//       {
//         type: "section",
//         text: {
//           type: "plain_text",
//           text: "This is a plain text section block.",
//           emoji: true
//         }
//       }
//     ];
//     // Respond to the message with a button
//     say({
//       text: "This is a plain text section block.",
//       blocks: message_blocks
//     });
//   }
// });
/*

###############################################################

########################### Start App ########################### 


###############################################################
*/

(async (PORT = 3000) => {
  //TODO: Add type
  try {
    const server = await app.start(process.env.PORT || PORT);
    console.log('⚡️ Bolt app is running!', PORT);
  } catch (error) {
    throw error;
  }

  console.log('Bolt is running');
})();

app.error(error => {
  console.error(error);
});

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

export default app;
