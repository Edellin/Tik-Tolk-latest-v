import { Chat, LastMessageResponse, Message } from "./interfaces/chats.interface";
import {isErrorMessages, isNewMessage, isUnreadMessage } from "./interfaces/type-guards";
import { ChatWsRxjsService } from "./services/chat-ws-rxjs.service";
import { ChatsService } from "./services/chats.service";

export {
  ChatWsRxjsService,
  ChatsService,
  isUnreadMessage,
  isNewMessage,
  isErrorMessages
};export type { Chat, Message, LastMessageResponse };

