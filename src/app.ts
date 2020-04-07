
import {
  App,
  ButtonAction,
  BlockAction,
  LogLevel,
  RespondArguments,
  SlackActionMiddlewareArgs,
  directMention,
  BlockButtonAction,
  Middleware,
  SayFn,
  SlackEventMiddlewareArgs,
  MessageEvent,
} from '@slack/bolt';
import { ErrorCode, ChatGetPermalinkArguments, WebAPICallResult } from '@slack/web-api';
import { getMessages, getChannel, getMe, setChannel, setMe } from './store';
import { copy, getUrlWithParams } from './helpers';
import { messages } from './messages';
import { StringIndexed } from '@slack/bolt/dist/types/helpers';
import { asCodedError } from "@slack/bolt/dist/errors";


const app: App = new App({
  authorize: () => {
    return Promise.resolve({

      botId: '<Add Your BOT ID>',
      botToken: process.env.SLACK_BOT_TOKEN,
      userToken: process.env.SLACK_USER_TOKEN,

    });
  },

  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

type SlackError = {
  code: string;
  data: object;
};

function errorDescription(error: SlackError): void {
  if (error.code === ErrorCode.RequestError) {
    console.error('ErrorCode.RequestError ', error.data);
  } else if (error.code === ErrorCode.PlatformError) {
    console.error('ErrorCode.PlatformError', error.data);
  } else if (error.code === ErrorCode.HTTPError) {
    console.error('ErrorCode.HTTPError ', error.data);
  } else {
    console.error('Well that was unexpected! ', error);
  }
}

/*
###############################################################


########################### ACTIONS ########################### 


###############################################################
*/
//
app.action('button_click', ({ action, ack, context, body, say }) => {
  ack();

  say(`<@${body.user.id}> clicked the ${action.type}`);
});

app.action('action_taken', ({ action, ack, body, say }) => {
  console.log('TCL: action', action);
  console.log('the body', body);

  ack();
  say(`<@${body.user.id}> clicked the  ${action.type}`);
});

interface Context extends BlockAction {
  context?: any;
}

const votesBlock : ContextBlock = {
	type: "context",
	elements: []
}

// The middleware will be called every time an interactive component with the action_id “escalate_yes" is triggered
app.action(
  'escalate_button',
  async ({
    ack,
    action,
    body,
    context,
    payload,
    respond,
  }: SlackActionMiddlewareArgs<BlockAction<ButtonAction>>): Promise<void> => {

  const context: Context = context as Context;
  const { context, action, body, payload, ack } = event;
  const { value } = payload;
  
  console.log('TCL: event', event);
  
async ({
    	ack,
    	action,
    	body,
     context: object,
    	payload,
    	respond,
      }
    console.log('TCL: body', body);
    console.log('TCL: action', JSON.stringify(action.value));
 
const buttonAction: ButtonAction = action as ButtonAction;
    ack();

    const actionData = JSON.parse(payload.value);

//     // Call the chat.getPermalink method with a token
    let result: any;
    try {
      result = await app.client.chat.getPermalink({
        // The token you used to initialize your app is stored in the `context` object
        //   token: context.botToken,
        channel: actionData.channel,
        message_ts: actionData.ts,
      });
      console.log('TCL: result', result.permalink);
    } catch (error) {
      errorDescription(error);
    }
    // say() method only posts a message to the same channel, so you need to call the method
    try {
      result;
      const post = await app.client.chat.postMessage({
        // The token you used to initialize your app is stored in the `context` object
        //   token: context.botToken,
        channel: 'CMPLZD6S3',
        text: `<@${actionData.user}> has excalated an issue \n ${result.permalink}`,
        unfurl_links: true,
      });
      console.log('TCL: post', post);
    } catch (error) {
      errorDescription(error);
    }
  },
);

app.action('escalate_button', async ({ ack, action, context }) => {
  ack();

  const buttonAction: ButtonAction = action as ButtonAction;

  const actionData = JSON.parse(buttonAction.value);

  // Call the chat.getPermalink method with a token
  let result: any;
  try {
    result = await app.client.chat.getPermalink({
      // The token you used to initialize your app is stored in the `context` object
      token: context.botToken,
      channel: actionData.channel,
      message_ts: actionData.ts,
    });
    console.log('TCL: result', result.permalink);
  } catch (error) {
    errorDescription(error);
  }
  
  // say() method only posts a message to the same channel, so you need to call the method
  try {
    result;
    const post = await app.client.chat.postMessage({
      // The token you used to initialize your app is stored in the `context` object
      token: context.botToken,
      channel: 'CMPLZD6S3',
      text: `<@${actionData.user}> has excalated an issue \n ${result.permalink}`,
      unfurl_links: true,
    });
    console.log('TCL: post', post);
  } catch (error) {
    errorDescription(error);
  }
});

let incidentOpenMessage: any = undefined;

app.action('incident_ack', async ({ action, body, ack, say, context }) => {
  console.log(action, body);
  const button: BlockButtonAction = body as BlockButtonAction;
  const { message } = button;
  ack();
  if (!message) {
    return;
  }
  if (!incidentOpenMessage) {
    say('This incident was already acknowledged.');
    return;
  }

  const blocksIncidentAck = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Incidents*\n\nThe incident was resolved by <@${body.user.id}>. :tada:`,
      },
    },
  ];
  await app.client.chat.update({
    text: 'Incident ackknowledged',
    ts: message.ts,
    channel: body.channel.id,
    blocks: blocksIncidentAck,
    token: context.botToken,
  });

  await app.client.reactions.add({
    name: 'white_check_mark',
    channel: body.channel.id,
    timestamp: incidentOpenMessage,
    token: context.botToken,
  });
  incidentOpenMessage = undefined;
});


/*
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


// Threads a message
app.message('42', ({ message, context }): void => {
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
})

// sends a button
app.message('hello', ({ message, say }) => {
  try {
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
  
  } catch (error) {
    errorDescription(error);
  }
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

/* Find out what's in the converstation context
Conversation context not loaded: Conversation not found
context 1 undefined
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

app.message('game', async ({ message, say }) => {
  console.log('TCL: message', message);

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
  console.log('TCL: message', message);

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
        action_id: 'escalate_button',
      },
    },
  ];

  // Respond to the message with a button
  say({
    text: 'HELla YES',
    blocks: message_blocks,
  });
});

app.message(({ message, say }) => {
  console.log('TCL: message within text includes red_circle', message);
  console.log(message);

  if (message.subtype !== undefined) {
    return;
  }

  if (message.text && message.text.includes('red_circle')) {
    if (incidentOpenMessage) {
      say('An incident is already open. Please resolve the previous incident.');
      return;
    }
    incidentOpenMessage = message.ts;

    say({
      text: 'Ackknowledgement',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              '*Incidents*\n\nAn incident has been created based on your message. This app is here to help you organize the communications with all the right people. :sweat_smile:',
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              action_id: 'incident_ack',
              text: {
                type: 'plain_text',
                text: 'Acknowledge',
              },
              value: 'incident_ack',
            },
          ],
        },
      ],
    });
  } else {
    say(`Hey <@${message.user}>`);
  }
});

/*

########################### COMMANDS ########################### 

###############################################################
*/

app.command(
  '/echo',
  async ({ command, ack, say }): Promise<void> => {
    // Acknowledge command request
    ack();
    say(`You said "${command.text}"`);
  },
);

/*
###############################################################


########################### EVENTS ########################### 


###############################################################
*/
interface UsersInfoResponse {
  ok?: boolean;
  user?: User;
  error?: string;
  needed?: string;
  provided?: string;
}

interface User {
  id?: string;
  team_id?: string;
  name?: string;
  deleted?: boolean;
  color?: string;
  real_name?: string;
  tz?: string;
  tz_label?: string;
  tz_offset?: number;
  profile?: Profile;
  is_admin?: boolean;
  is_owner?: boolean;
  is_primary_owner?: boolean;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
  is_bot?: boolean;
  is_app_user?: boolean;
  updated?: number;
  has_2fa?: boolean;
}

interface Profile {
  title?: string;
  phone?: string;
  skype?: string;
  real_name?: string;
  real_name_normalized?: string;
  display_name?: string;
  display_name_normalized?: string;
  status_text?: string;
  status_emoji?: string;
  status_expiration?: number;
  avatar_hash?: string;
  bot_id?: string;
  api_app_id?: string;
  always_active?: boolean;
  image_original?: string;
  first_name?: string;
  last_name?: string;
  image_24?: string;
  image_32?: string;
  image_48?: string;
  image_72?: string;
  image_192?: string;
  image_512?: string;
  image_1024?: string;
  status_text_canonical?: string;
  team?: string;
  is_custom_image?: boolean;
}

app.event('app_mention', async ({ event, say, context }) => {
  console.log('event: ', event.user);
  try {
    const res: UsersInfoResponse = await app.client.users.info({
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
    errorDescription(reason);
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

app.event('member_joined_channel', async ({ context, event, say }) => {
  const channel = getChannel();
  const user = event.user;

  // check if our Bot user itself is joining the channel
  if (user === getMe() && channel) {
    const message = copy(messages.welcome_channel);
    // fill in placeholder values with channel info
    message.blocks[0].text.text = message.blocks[0].text.text
      .replace('{{channelName}}', channel.name)
      .replace('{{channelId}}', channel.id);
    say(message);
  }
});

interface ReactionAddedEvent {
  type: 'reaction_added';
  user: string;
  reaction: string;
  item_user: string;
  item: Item;
  event_ts: string;
}
interface ReactionAddedPayload {
  token?: string;
  team_id?: string;
  api_app_id?: string;
  event?: Event;
  type?: string;
  authed_users?: string[];
  event_id?: string;
  event_time?: number;
  channel?: string;
}
interface Event {
  type?: string;
  user?: string;
  reaction?: string;
  item_user?: string;
  item?: Item;
  event_ts?: string;
}
interface Item {
  type?: string;
  channel?: string;
  ts?: string;
  file?: string;
  file_comment?: string;
}
interface UsersInfoResponse {
  ok?: boolean;
  user?: User;
  error?: string;
  needed?: string;
  provided?: string;
}

interface User {
  id?: string;
  team_id?: string;
  name?: string;
  deleted?: boolean;
  color?: string;
  real_name?: string;
  tz?: string;
  tz_label?: string;
  tz_offset?: number;
  profile?: Profile;
  is_admin?: boolean;
  is_owner?: boolean;
  is_primary_owner?: boolean;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
  is_bot?: boolean;
  is_app_user?: boolean;
  updated?: number;
  has_2fa?: boolean;
}

interface Profile {
  title?: string;
  phone?: string;
  skype?: string;
  real_name?: string;
  real_name_normalized?: string;
  display_name?: string;
  display_name_normalized?: string;
  status_text?: string;
  status_emoji?: string;
  status_expiration?: number;
  avatar_hash?: string;
  bot_id?: string;
  api_app_id?: string;
  always_active?: boolean;
  image_original?: string;
  first_name?: string;
  last_name?: string;
  image_24?: string;
  image_32?: string;
  image_48?: string;
  image_72?: string;
  image_192?: string;
  image_512?: string;
  image_1024?: string;
  status_text_canonical?: string;
  team?: string;
  is_custom_image?: boolean;
}

app.event('reaction_added', async ({ event, context }) => {
  // only react to ⚡ (:zap:) emoji
  //
  // const events: ReactionAddedEvent = event as ReactionAddedPayload;
  // let event: ReactionAddedEvent;'

  if (event.reaction === 'zap') {
    const { channel, ts } = event.item as MessageEvent;

    // get a permalink for this message
    const permalink = await app.client.chat.getPermalink({
      token: context.botToken,
      message_ts: ts,
      channel: channel,
    });

    // get user info of user who reacted to this message
    const user: any = await app.client.users.info({
      token: context.botToken,
      user: event.user,
    });

    //

    const name = '<@' + user.user.id + '>';
    const channelGot = getChannel();

    // post this message to the configured channel
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: channelGot && channelGot.id,
      text: name + ' wants you to see this message: ' + permalink.permalink,
      unfurl_links: true,
      unfurl_media: true,
    });

    // formatting the user's name to mention that user in the message (see: https://api.slack.com/messaging/composing/formatting)
  }
});

app.event('reaction_added', async ({ event, say }) => {
  console.log(event);
  const said = say as SayFn;

  say({ text: `:${event.reaction}:` });
});

app.event('reaction_added', async ({ event, say }) => {
  // only react to a certain emoji. :frowning: for example
  if (event.reaction === 'frowning') {
    // const channelId = event.item.channel;
    // const ts = event.item.ts;
    const message_blocks = [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'This is a plain text section block.',
          emoji: true,
        },
      },
    ];
    // Respond to the message with a button
    say({
      text: 'This is a plain text section block.',
      blocks: message_blocks,
    });
  }
});
app.event('reaction_added', ({ event, say }) => {
  if (event.reaction === 'calendar') {
    say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Pick a date for me to remind you',
          },
          accessory: {
            type: 'datepicker',
            action_id: 'datepicker_remind',
            initial_date: '2019-04-28',
            placeholder: {
              type: 'plain_text',
              text: 'Select a date',
            },
          },
        },
      ],
    });
  }
});


###############################################################

########################### Start App ########################### 


###############################################################
*/


/*

########################### Start App ########################### 

*/

if (process.env.NODE_ENV !== "production") {
  (async (PORT = 3000) => {
    try {
      await app.start(process.env.PORT || PORT);
    } catch (error) {
      throw error;
    }

    console.log(
      `> Template Bolt is running on PORT ${PORT} in ${process.env.NODE_ENV}`
    );
  })();
}

app.error(err => {
  console.error("As Codeded Error", asCodedError(err));
});


console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

process.on("uncaughtException", function(err) {
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", function(reason, p) {
  console.error("Unhandled rejection", reason);
});


export default app;
