import {
  Middleware,
  SlackAction,
  SlackActionMiddlewareArgs,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from '@slack/bolt';
import * as ActionEvents from '@slack/bolt/dist/types/actions';
export { ActionEvents };

export type ActionHandler<ActionType extends SlackAction = SlackAction> = Middleware<
  SlackActionMiddlewareArgs<ActionType>
>;
export type CommandHandler = Middleware<SlackCommandMiddlewareArgs>;
export type EventHandler<EventType extends string = string> = Middleware<SlackEventMiddlewareArgs<EventType>>;
export type MessageHandler = EventHandler<'message'>;
