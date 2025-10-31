import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, LastMessageResponse, Message } from '@tt/data-access';
import {map, Observable} from 'rxjs';
import { ProfileService } from "@tt/data-access";
import {ChatWsService} from "../interfaces/chat-ws-service.interface";
import { AuthService } from "@tt/data-access"
import {ChatWSMessage} from "../interfaces/chat-ws-message.interface";
import {isNewMessage, isUnreadMessage} from "@tt/data-access";
import {ChatWsRxjsService} from "@tt/data-access";
import {TokenResponse} from "@tt/data-access";
@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  #authService = inject(AuthService);
  me = inject(ProfileService).me;
  activeChat = signal<Chat | null>(null)

  wsAdapter: ChatWsService = new ChatWsRxjsService()

  unreadMessagesCount = signal(0)
  activeChatMessages = signal<Message[]>([]);


  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  connectWs() {
    return this.wsAdapter.connect({
    url: `${this.baseApiUrl}chat/ws`,
    token: this.#authService.token ?? '',
    handleMessage: this.handleWSMessage
  }) as Observable<ChatWSMessage>;
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return

    if (isUnreadMessage(message)) {
      this.unreadMessagesCount.set(message.data.count)
    }

    if (isNewMessage(message) && this.activeChat()?.id === message.data.chat_id ) {
        const newMessage =
          {
            id: message.data.id,
            userFromId: message.data.author,
            personalChatId: message.data.chat_id,
            text: message.data.message,
            createdAt: message.data.created_at,
            isRead: false,
            isMine: message.data.author === this.me()?.id,
            user: this.activeChat()?.userFirst.id === message.data.author
              ? this.activeChat()?.userFirst
              : this.activeChat()?.userSecond
          }
        this.activeChatMessages.set([...this.activeChatMessages(), newMessage]);
    }
  }

  createChat(userId: number) {

    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageResponse[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        this.activeChat.set(chat)
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage<Message>(chatId: number, message: string) {
    return this.http.post(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }

  #refreshToken() {
    this.#authService
      .refreshAuthToken()
      .subscribe((res: TokenResponse) => {
        this.wsAdapter.disconnect()
        this.connectWs()
      })
  }
}
