import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {postActions} from "./action";
import {map, switchMap} from "rxjs";
import {PostService} from "@tt/data-access";

@Injectable({
  providedIn: 'root',
})

export class PostEffects {
  postsService = inject(PostService)
  actions$ = inject(Actions)

  loadedPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchPosts),
      switchMap((post) => {
        return this.postsService.fetchPosts().pipe(
          map((posts) => postActions.postsLoaded({posts}))

        )
      })
    )
  })

   createPost$ = createEffect(() => {
     return this.actions$.pipe(
       ofType(postActions.createdPosts),
       switchMap(({payload}) =>
         this.postsService
           .createPost({
             title: payload.title,
             content: payload.content,
             authorId: payload.authorId
           })
           .pipe(
             map(()=> postActions.fetchPosts({}))
           )
     )
     )
   })

  loadComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchComments),
      switchMap(
        ({postId}) =>
        this.postsService
          .getCommentsByPostId(postId)
          .pipe(
            map((comments) => postActions.commentsLoaded({comments})))
      )
    )
  })

  createComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createComment),
      switchMap(({payload}) =>
        this.postsService
          .createComment({
            text: payload.text,
            authorId: payload.authorId,
            postId: payload.postId,
          })
          .pipe(
            map(()=> postActions.fetchPosts({})))
          )
      )
  })
}

