import { App, LogLevel } from "@slack/bolt";
import * as WebApi from "seratch-slack-types/web-api";

const app: App = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});

import { ErrorCode } from "@slack/web-api";

type SlackError = {
  code: string;
  data: object;
};

function errorDescription(error: SlackError): void {
  if (error.code === ErrorCode.RequestError) {
    // Some other error, oh no!
    console.log("ErrorCode.RequestError ", error.data);
  } else if (error.code === ErrorCode.PlatformError) {
    console.log("ErrorCode.PlatformError", error.data);
  } else if (error.code === ErrorCode.HTTPError) {
    // Some other error, oh no!
    console.log("ErrorCode.HTTPError ", error.data);
  } else {
    console.error("Well that was unexpected! ", error);
  }
}

/*
########################### MESSAGES ########################### 

*/

// const response = await web.users.info({ user: "..." });
app.message("happy", async ({ message, context }) => {
  try {
    const result = await app.client.reactions.add({
      token: context.botToken,
      name: "grinning",
      channel: message.channel,
      timestamp: message.ts
    });
    const response = await app.client.reactions.add({
      token: context.botToken,
      name: "star",
      channel: message.channel,
      timestamp: message.ts
    });
    console.log("reactions.add result & response:", result, response);
  } catch (error) {
    errorDescription(error);
  }
});

app.message("42", ({ message, context }) => {
  // use chat.postMessage over say method
  try {
    const response = app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      text: "The answer to life, the universe and everything",
      thread_ts: message.ts
    });
    console.log("response from postMessage", response);
  } catch (reason) {
    console.error(`Failed because ${reason}`);
  }
});

app.message("hello", ({ message, say }) => {
  say({
    text: `Ewok is a dog!`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me"
          },
          action_id: "button_click"
        }
      }
    ]
  });
});

/*

########################### ACTIONS ########################### 
*/

app.action("button_click", ({ action, ack, body, say }) => {
  ack();
  say(`<@${body.user.id}> clicked the button  ${action.type}`);
});

/*
########################### COMMANDS ########################### 

*/

app.command("/echo", async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();
  say(`You said "${command.text}"`);
});

/*
########################### EVENTS ########################### 
*/

app.event("app_mention", async ({ event, say, context }) => {
  console.log("event: ", event.user);
  try {
    const res: WebApi.UsersInfoResponse = await app.client.users.info({
      token: context.botToken,
      user: event.user
    });

    if (res.ok) {
      if (res.user) {
        say({
          text: `Hi! <@${res.user.name}>`
        });
      }
    }
  } catch (reason) {
    console.error(`Failed because ${reason}`);
  }
});

/*
########################### Start App ########################### 
*/

(async (PORT = 3000) => {
  try {
    await app.start(process.env.PORT || PORT);
    console.log("TCL: process.env.PORT", process.env.PORT);
  } catch (error) {
    throw error;
  }

  console.log("Bolt is running");
})();

app.error(error => {
  console.error(error);
});

console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

export default app;
