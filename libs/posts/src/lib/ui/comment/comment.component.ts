import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TimeAgoPipe} from "../../../../../common-ui/src/lib/pipes";
import {AvatarCircleComponent} from "libs/common-ui/src/lib/components/avatar-circle/avatar-circle.component";
import {PostComment} from "@tt/data-access";


@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  comment = input<PostComment>();
}
