import {ChangeDetectionStrategy, Component, HostBinding, input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Message} from "@tt/data-access";
import {AvatarCircleComponent} from "@tt/common-ui";



@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
