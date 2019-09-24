# Bolt Slack App template

#### change the URL based on environmnet

```js
if (process.env.NODE_ENV === "test") {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  // options.slackApiUrl = 'http://localhost:8888/api/';
}
```
