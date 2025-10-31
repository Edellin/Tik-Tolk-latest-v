import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {GlobalStoreService} from '@tt/data-access';
import { AvatarCircleComponent, SvgIconComponent } from 'libs/common-ui/src/lib/components';



@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, NgIf, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostInputComponent {
  r2 = inject(Renderer2);

  isCommentInput = input(false);
  postId = input<number>(0);
  profile = inject(GlobalStoreService).me;

  @Output() created = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }
  onSend() {
    if (this.postText.trim()) {
      this.created.emit(this.postText);
      this.postText = ''
    }
  }
  onKeyUp() {
      this.onSend();
  }
}
