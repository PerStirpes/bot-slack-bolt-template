// import {
//   App,
//   ButtonAction,
//   BlockAction,
//   LogLevel,
//   RespondArguments,
//   SlackActionMiddlewareArgs,
//   directMention,
//   BlockButtonAction,
//   Middleware,
//   SayFn,
//   SlackEventMiddlewareArgs,
//   MessageEvent,
// } from '@slack/bolt'
// import { ErrorCode, ChatGetPermalinkArguments, WebAPICallResult } from '@slack/web-api'
// app.message(({ message, say }) => {
//   console.log('TCL: message within text includes red_circle', message);
//   console.log(message);

//   if (message.subtype !== undefined) {
//     return;
//   }

//   if (message.text && message.text.includes('red_circle')) {
//     if (incidentOpenMessage) {
//       say('An incident is already open. Please resolve the previous incident.');
//       return;
//     }
//     incidentOpenMessage = message.ts;

//     say({
//       text: 'Ackknowledgement',
//       blocks: [
//         {
//           type: 'section',
//           text: {
//             type: 'mrkdwn',
//             text:
//               '*Incidents*\n\nAn incident has been created based on your message. This app is here to help you organize the communications with all the right people. :sweat_smile:',
//           },
//         },
//         {
//           type: 'actions',
//           elements: [
//             {
//               type: 'button',
//               action_id: 'incident_ack',
//               text: {
//                 type: 'plain_text',
//                 text: 'Acknowledge',
//               },
//               value: 'incident_ack',
//             },
//           ],
//         },
//       ],
//     });
//   } else {
//     say(`Hey <@${message.user}>`);
//   }
// });

// app.message('knock knock', ({ message, say }) => {
//   say(`_Who's there?_`);
// });

/* Find out what's in the converstation context
Conversation context not loaded: Conversation not found
context 1 undefined
*/

// app.message(/open the (.*) doors/i, ({ say, context }) => {
//   const doorType = context.matches[0];
//   const text = doorType === 'pod bay' ? 'I’m afraid I can’t let you do that.' : `Opening ${doorType} doors`;
//   say(text);
// });

// const answer = 'HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING';
// app.message('what is the answer to the ultimate question of life', directMention(), ({ say }) => {
//   if (answer) {
//     say(`${answer}, but what is the question?`);
//   }
// });

// Threads a message
// app.message('42', ({ message, context }): void => {
//   // use chat.postMessage over say method
//   try {
//     const response = app.client.chat.postMessage({
//       token: context.botToken,
//       channel: message.channel,
//       text: 'The answer to life, the universe and everything',
//       thread_ts: message.ts,
//     });
//     console.log('response from postMessage', response);
//   } catch (reason) {
//     console.error(`Failed because ${reason}`);
//   }
// })

// sends a button
// app.message('hello', ({ message, say }) => {
//   try {
//   say({
//     text: `Ewok is a dog!`,
//     blocks: [
//       {
//         type: 'section',
//         text: {
//           type: 'mrkdwn',
//           text: `Hey there <@${message.user}>!`,
//         },
//         accessory: {
//           type: 'button',
//           text: {
//             type: 'plain_text',
//             text: 'Click Me',
//           },
//           action_id: 'button_click',
//         },
//       },
//     ],
//   });

//   } catch (error) {
//     errorDescription(error);
//   }
// });
