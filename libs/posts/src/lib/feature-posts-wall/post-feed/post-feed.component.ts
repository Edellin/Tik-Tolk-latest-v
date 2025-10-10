import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import {firstValueFrom } from 'rxjs';
import {PostInputComponent} from '../../ui';
import {PostComponent, PostService} from "@tt/posts";

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  standalone: true,
})
export class PostFeedComponent {
  postService = inject(PostService);
  hostElement = inject(ElementRef);

  r2 = inject(Renderer2);
  feed = this.postService.posts;

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

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 16;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
