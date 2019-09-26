# Bolt Slack App template

#### ngrok tunnel command

`ngrok http -subdomain=chocolatemilk 3000`

#### [Interactive Components URL add here](https://api.slack.com/apps/ANPG45QKY/interactive-messages?)

- `https://chocolatemilk.ngrok.io/slack/events`

#### [Event Subscription URL add here](https://api.slack.com/apps/ANPG45QKY/event-subscriptions?)

- `https://chocolatemilk.ngrok.io/slack/events`

#### change the URL based on environmnet

TODO: _research how to setup_

```js
if (process.env.NODE_ENV !== "production") {
	console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
	// options.slackApiUrl = 'http://localhost:8888/api/';
}
```
