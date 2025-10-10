import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {Post, PostComment, PostService} from '../../data';
import {AvatarCircleComponent, SvgIconComnonent} from '@tt/common-ui';
import {CommentComponent, PostInputComponent} from '../../ui';
import {TimeAgoPipe} from "../../../../../common-ui/src/lib/pipes";

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComnonent,
    PostInputComponent,
    CommentComponent,
    TimeAgoPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  standalone: true,
})
export class PostComponent implements OnInit {
  post = input<Post>();

  comments = signal<PostComment[]>([]);

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id));
    this.comments.set(comments);
  }
}
