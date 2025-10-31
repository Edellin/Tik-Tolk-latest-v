import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {AvatarCircleComponent} from "libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component";
import {ProfileService} from "@tt/data-access";
import {SvgIconComponent} from "libs/common-ui/src/lib/components/svg-icon/svg-icon.components.ts/svg-icon.component";


@Component({
  selector: 'app-message-input',
  imports: [FormsModule, AvatarCircleComponent, SvgIconComponent, NgIf],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class MessageInputComponent {
  r2 = inject(Renderer2);
  // @ts-ignore
  me = inject(ProfileService).me;

  @Output() created = new EventEmitter<string>();

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }
}

export default MessageInputComponent
