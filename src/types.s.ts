import {
  Middleware,
  SlackAction,
  SlackActionMiddlewareArgs,
  SlackCommandMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from '@slack/bolt'
import * as ActionEvents from '@slack/bolt/dist/types/actions'
export { ActionEvents }

export type ActionHandler<ActionType extends SlackAction = SlackAction> = Middleware<
  SlackActionMiddlewareArgs<ActionType>
>
export type CommandHandler = Middleware<SlackCommandMiddlewareArgs>
export type EventHandler<EventType extends string = string> = Middleware<SlackEventMiddlewareArgs<EventType>>
export type MessageHandler = EventHandler<'message'>

export interface Event {
  type?: string
  user?: string
  reaction?: string
  item_user?: string
  item?: Item
  event_ts?: string
}
export interface Item {
  type?: string
  channel?: string
  ts?: string
  file?: string
  file_comment?: string
}
export interface ReactionAddedEvent {
  type: 'reaction_added'
  user: string
  reaction: string
  item_user: string
  item: Item
  event_ts: string
}
export interface ReactionAddedPayload {
  token?: string
  team_id?: string
  api_app_id?: string
  event?: Event
  type?: string
  authed_users?: string[]
  event_id?: string
  event_time?: number
  channel?: string
}
