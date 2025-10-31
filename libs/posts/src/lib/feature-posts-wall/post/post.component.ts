import {ChangeDetectionStrategy, Component, inject, input, OnInit, Signal} from '@angular/core';
import { AvatarCircleComponent, SvgIconComponent } from 'libs/common-ui/src/lib/components';
import {DatePipe} from "@angular/common";
import {CommentComponent, PostInputComponent} from "@tt/posts";
import {Store} from "@ngrx/store";
import {GlobalStoreService, Post, PostComment} from "@tt/data-access";
import {postActions} from "@tt/posts";
import {selectCommentsByPostId} from "@tt/posts";


@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DatePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments!: Signal<PostComment[]>;
  profile = inject(GlobalStoreService).me;
  store = inject(Store);

  // comments2 = computed(()=> {
  //   if(this.comments()?.length > 0){
  //      return this.comments()
  //   }
  //   return this.post()?.comments
  // })



  async ngOnInit() {
    this.store.dispatch(postActions.fetchPosts({}))
    this.comments = this.store.selectSignal(selectCommentsByPostId(this.post()!.id))
    this.store.dispatch(postActions.fetchComments({postId: this.post()!.id}))
  }

  async onCreated(commentText: string) {
    if (!commentText.trim()) return;

    this.store.dispatch(
      postActions.createComment({
        payload: {
          text: commentText.trim(),
          authorId: this.profile()!.id,
          postId: this.post()!.id
        }
      })
    );
  }

}


