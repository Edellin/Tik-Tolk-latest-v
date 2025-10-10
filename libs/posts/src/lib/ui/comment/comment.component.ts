import { Component, input } from '@angular/core';
import {PostComment} from "@tt/posts";
import {TimeAgoPipe} from "../../../../../common-ui/src/lib/pipes";
import {AvatarCircleComponent} from "@tt/common-ui";


@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  standalone: true,
})
export class CommentComponent {
  comment = input<PostComment>();
}
