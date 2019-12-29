# Bolt Slack App template

A starter that I use to spin up slack apps. The updates are still on a branch on my local machine that I need to push.


## Local Development

### One-time setup

1. Set up [ngrok](https://ngrok.com/).
   - Download ngrok and add it to your classpath.
   - Sign up for a free ngrok account and follow the instructions to add your auth token to your local configuration. This allows your ngrok tunnels to run indefinitely.
   - Go to your [ngrok dashboard](https://dashboard.ngrok.com/reserved) to reserve a dedicated domain. This allows you to use the same domain across ngrok tunnel restarts.
2. Create a Slack app on https://api.slack.com/apps named `Whatever's special to you ($YOURNAME dev)`.
3. Fully configure your Slack app.
   - The settings on all of the sub-pages under "Features" should be identical to the configuration of the [Slack staging app](https://api.slack.com/apps/<API_ID>) except for the following items. Ask a team member if you don't have access to view the staging app configuration.
   - All app URLs should be based from your ngrok-provided URL (e.g. `https://<ngrok-url>.ngrok.io/slack/events`) instead of the hosted staging app URL .
   - All slash commands should be namespaced in the form of `/slashcommand`.
4. Copy `.env.template` in the root directory of this repository to `.env`. In this file you will provide your application with the configuration details we specified above. Follow the instructions in that file.

6. Run `yarn`

### Starting your local app

1. `ngrok http 3000 -subdomain=YOURSUBDOMAIN`. This will start ngrok for your desired port and subdomain.
2. `now dev`. This will start your database and the node app.
3. Go to `https://YOURSUBDOMAIN.ngrok.io/`,
4. In Slack, type `/slashcommand`  to use your app!

Local changes should be picked up automatically without needing to restart the app.

##### Add secrets
within the root directory
`$ touch now.json`

`$ now secret add <your-secret>`
