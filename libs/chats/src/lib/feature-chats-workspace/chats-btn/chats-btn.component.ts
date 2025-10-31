import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { AvatarCircleComponent } from "libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component";
import {LastMessageResponse} from "@tt/data-access";


@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsBtnComponent {
  chat = input<LastMessageResponse>();
}
