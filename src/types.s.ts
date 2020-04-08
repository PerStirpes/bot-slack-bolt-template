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

export interface UsersInfoResponse {
  ok?: boolean
  user?: User
  error?: string
  needed?: string
  provided?: string
}

interface User {
  id?: string
  team_id?: string
  name?: string
  deleted?: boolean
  color?: string
  real_name?: string
  tz?: string
  tz_label?: string
  tz_offset?: number
  profile?: Profile
  is_admin?: boolean
  is_owner?: boolean
  is_primary_owner?: boolean
  is_restricted?: boolean
  is_ultra_restricted?: boolean
  is_bot?: boolean
  is_app_user?: boolean
  updated?: number
  has_2fa?: boolean
}

export interface Profile {
  title?: string
  phone?: string
  skype?: string
  real_name?: string
  real_name_normalized?: string
  display_name?: string
  display_name_normalized?: string
  status_text?: string
  status_emoji?: string
  status_expiration?: number
  avatar_hash?: string
  bot_id?: string
  api_app_id?: string
  always_active?: boolean
  image_original?: string
  first_name?: string
  last_name?: string
  image_24?: string
  image_32?: string
  image_48?: string
  image_72?: string
  image_192?: string
  image_512?: string
  image_1024?: string
  status_text_canonical?: string
  team?: string
  is_custom_image?: boolean
}
export interface UsersInfoResponse {
  ok?: boolean
  user?: User
  error?: string
  needed?: string
  provided?: string
}

interface User {
  id?: string
  team_id?: string
  name?: string
  deleted?: boolean
  color?: string
  real_name?: string
  tz?: string
  tz_label?: string
  tz_offset?: number
  profile?: Profile
  is_admin?: boolean
  is_owner?: boolean
  is_primary_owner?: boolean
  is_restricted?: boolean
  is_ultra_restricted?: boolean
  is_bot?: boolean
  is_app_user?: boolean
  updated?: number
  has_2fa?: boolean
}

export interface Profile {
  title?: string
  phone?: string
  skype?: string
  real_name?: string
  real_name_normalized?: string
  display_name?: string
  display_name_normalized?: string
  status_text?: string
  status_emoji?: string
  status_expiration?: number
  avatar_hash?: string
  bot_id?: string
  api_app_id?: string
  always_active?: boolean
  image_original?: string
  first_name?: string
  last_name?: string
  image_24?: string
  image_32?: string
  image_48?: string
  image_72?: string
  image_192?: string
  image_512?: string
  image_1024?: string
  status_text_canonical?: string
  team?: string
  is_custom_image?: boolean
}
