import { App, LogLevel } from "@slack/bolt";
import * as WebApi from "seratch-slack-types/web-api";
import { errorDescription } from "./utils";
import { asCodedError } from "@slack/bolt/dist/errors";

const app: App = new App({
  authorize: () => {
    return Promise.resolve({
      botId: "BNP5WM5LP",
      botToken: process.env.SLACK_BOT_TOKEN,
      userToken: process.env.SLACK_USER_TOKEN
    });
  },

  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});

/*

########################### MESSAGES ########################### 

*/

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

// Threads a message
app.message("42", ({ message, context }): void => {
  // use chat.postMessage over say method
  try {
    const response = app.client.chat.postMessage({
      token: context.botToken,
      channel: message.channel,
      text: "The answer to life, the universe and everything",
      thread_ts: message.ts
    });
    console.log("response from postMessage", response);
  } catch (error) {
    errorDescription(error);
  }
});

// sends a button
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
    errorDescription(reason);
  }
});

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
      `> Workplace Ops Bolt is running on PORT ${PORT} in ${process.env.NODE_ENV}`
    );
  })();
}

app.error(err => {
  console.error("As Codeded Error", asCodedError(err));
});

process.on("uncaughtException", function(err) {
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", function(reason, p) {
  console.error("Unhandled rejection", reason);
});

export default app;
