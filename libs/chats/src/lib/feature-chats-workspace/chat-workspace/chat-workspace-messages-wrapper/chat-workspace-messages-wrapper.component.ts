import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import MessageInputComponent from '../../../ui/message-input/message-input.component';
import {Chat, ChatsService} from "@tt/data-access";
import {ChatWorkspaceMessageComponent} from "./chat-workspace-message/chat-workspace-message.component";



@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<Chat>();

  message = this.chatsService.activeChatMessages;

  async onSendMessage(messageText: string) {
    this.chatsService.wsAdapter.sendMessage(messageText, this.chat().id)

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }

  groupedMessages() {
    const groups: { date: string; label: string; messages: any[] }[] = [];
    const msgs = this.chatsService.activeChatMessages();

    for (const msg of msgs) {
      const d = new Date(msg.createdAt);
      const key = d.toDateString();
      let group = groups.find((g) => g.date === key);

      if (!group) {
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

        let label = '';
        if (diffDays === 0) {
          label = 'Сегодня';
        } else if (diffDays === 1) {
          label = 'Вчера';
        } else {
          const formatter = new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
          });
          label = formatter.format(d);
        }

        group = { date: key, label, messages: [] };
        groups.push(group);
      }

      group.messages.push(msg);
    }

    return groups;
  }

}
