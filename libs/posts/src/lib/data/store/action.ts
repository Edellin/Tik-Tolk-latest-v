import {createActionGroup, props} from "@ngrx/store";
import {
  CommentCreateDto,
  Post,
  PostComment, PostCreateDto,
} from "../../../../../data-access/src/lib/data/posts/interfaces/post.interface";

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'fetch posts': props<{page?: number}>(),
    'posts loaded': props<{posts: Post[]}>(),
    'created posts ': props<{payload: PostCreateDto}>(),

    'fetch comments': props<{postId: number}>(),
    'comments loaded': props<{comments: PostComment[]}>(),
    'create comment': props<{payload: CommentCreateDto}>()
  }
})
