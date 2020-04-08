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
// import { App, ButtonAction, LogLevel, directMention, BlockButtonAction, MessageEvent } from '@slack/bolt'
// import { getMessages, getChannel, getMe, setChannel, setMe } from './store'
// import { asCodedError } from '@slack/bolt/dist/errors'
// import { copy, getUrlWithParams } from './helpers'

// import { errorDescription } from './utils'
// import { messages } from './messages'
// import { UsersInfoResponse } from './types.s'

/*
###############################################################
########################### ACTIONS ########################### 
###############################################################
*/

// app.action('button_click', ({ action, ack, context, body, say }) => {
//   ack();

//   say(`<@${body.user.id}> clicked the ${action.type}`);
// });

// app.action('action_taken', ({ action, ack, body, say }) => {
//   console.log('TCL: action', action);
//   console.log('the body', body);

//   ack();
//   say(`<@${body.user.id}> clicked the  ${action.type}`);
// });

// interface Context extends BlockAction {
//   context?: any
// }

// const votesBlock: ContextBlock = {
//   type: 'context',
//   elements: [],
// }

// The middleware will be called every time an interactive component with the action_id “escalate_yes" is triggered
// app.action(
//   'escalate_button',
//   async ({
//     ack,
//     action,
//     body,
//     context,
//     payload,
//     respond,
//   }: SlackActionMiddlewareArgs<BlockAction<ButtonAction>>): Promise<void> => {

//   const context: Context = context as Context;
//   // const { context, action, body, payload, ack } = event;
//   const { value } = payload;

// async ({
//     	ack,
//     	action,
//     	body,
//      context: object,
//     	payload,
//     	respond,
//       }
//     console.log('TCL: body', body);
//     console.log('TCL: action', JSON.stringify(action.value));

// const buttonAction: ButtonAction = action as ButtonAction;
//     ack();

//     const actionData = JSON.parse(payload.value);

// //     // Call the chat.getPermalink method with a token
//     let result: any;
//     try {
//       result = await app.client.chat.getPermalink({
//         // The token you used to initialize your app is stored in the `context` object
//         //   token: context.botToken,
//         channel: actionData.channel,
//         message_ts: actionData.ts,
//       });
//       console.log('TCL: result', result.permalink);
//     } catch (error) {
//       errorDescription(error);
//     }
//     // say() method only posts a message to the same channel, so you need to call the method
//     try {
//       result;
//       const post = await app.client.chat.postMessage({
//         // The token you used to initialize your app is stored in the `context` object
//         //   token: context.botToken,
//         channel: 'CMPLZD6S3',
//         text: `<@${actionData.user}> has excalated an issue \n ${result.permalink}`,
//         unfurl_links: true,
//       });
//       console.log('TCL: post', post);
//     } catch (error) {
//       errorDescription(error);
//     }
//   },
// );
