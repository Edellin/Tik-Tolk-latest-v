import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
  Renderer2
} from '@angular/core';
import {firstValueFrom } from 'rxjs';
import {PostInputComponent} from '../../ui';
import {Store} from "@ngrx/store";
import {PostComponent} from "@tt/posts";
import {GlobalStoreService, PostService} from "@tt/data-access";
import {postActions, selectAllPosts} from "../../data";


@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFeedComponent {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  store = inject(Store)
  r2 = inject(Renderer2);
  profile = inject(GlobalStoreService).me;
  feed = this.store.selectSignal(selectAllPosts);

  @Input() isCommentInput = false;
  @Input() postId: number = 0;
  @Output() created = new EventEmitter<void>();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput;
  }

  @HostListener('window:resize')
  onWindowResize() {
    console.log(123);
    this.resizeFeed();
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  ngOnInit() {
    this.store.dispatch(postActions.fetchPosts({}))
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 16;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    this.store.dispatch(postActions.createdPosts({
      payload: {
        title: 'Клевый пост',
        content: postText,
        authorId: this.profile()!.id
      }
    }))
  }
  trackByPostId(index: number, post: any): number {
    return post.id;
  }
}
