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
// app.event('reaction_added', async ({ event, say }) => {
//   console.log(event);
//   const said = say as SayFn;
//   say({ text: `:${event.reaction}:` });
// });

// app.event('reaction_added', ({ event, say }) => {
//   if (event.reaction === 'calendar') {
//     say({
//       blocks: [
//         {
//           type: 'section',
//           text: {
//             type: 'mrkdwn',
//             text: 'Pick a date for me to remind you',
//           },
//           accessory: {
//             type: 'datepicker',
//             action_id: 'datepicker_remind',
//             initial_date: '2019-04-28',
//             placeholder: {
//               type: 'plain_text',
//               text: 'Select a date',
//             },
//           },
//         },
//       ],
//     });
//   }
// });

// app.event('member_joined_channel', ({ event, say }) => {
//   console.log('this is the event', event);
//   say({ text: randomEnterReply() });
// });

// app.event('member_left_channel', ({ say }) => say(randomLeaveReply()));
