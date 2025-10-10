import { Component, HostBinding, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {AvatarCircleComponent} from '@tt/common-ui';
import {Message} from '../../../../date/interfaces/chats.interface';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  standalone: true,
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
