import { Component, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { Chat, Message } from '../../../date/interfaces/chats.interface';
import { firstValueFrom } from 'rxjs';
import {ChatsService, MessageInputComponent} from '@tt/chats';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  standalone: true,
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<Chat>();

  message = this.chatsService.activeChatMessages;

  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText));

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }

  groupedMessages() {
    const groups: { date: string; label: string; messages: any[] }[] = [];
    const msgs = this.chatsService.activeChatMessages();

    for (const msg of msgs) {
      const d = new Date(msg.createAt);
      const key = d.toDateString();
      let group = groups.find((g) => g.date === key);

      if (!group) {
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

        let label = '';
        if (diffDays === 0) label = 'Сегодня';
        else if (diffDays === 1) label = 'Вчера';
        else label = `${diffDays} дн. назад`;

        group = { date: key, label, messages: [] };
        groups.push(group);
      }
      group.messages.push(msg);
    }
    return groups;
  }
}
