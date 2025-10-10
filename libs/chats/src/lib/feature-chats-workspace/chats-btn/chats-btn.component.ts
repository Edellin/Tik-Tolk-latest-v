import { Component, input } from '@angular/core';
import { Chat, LastMessageResponse } from '../../date/interfaces/chats.interface';
import {AvatarCircleComponent} from '@tt/common-ui';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  standalone: true,
})
export class ChatsBtnComponent {
  chat = input<LastMessageResponse>();
}
