
import {createFeature, createReducer, on} from "@ngrx/store";
import {postActions} from "./action";
import {Post, PostComment} from "@tt/data-access";


export interface PostState {
  posts: Post[],
  comments: Record<number, PostComment[]>
}

export const initialState: PostState = {
  posts: [],
  comments: []
}

export const postFeature = createFeature({
  name: 'post',
  reducer: createReducer(
    initialState,

    on(postActions.postsLoaded, (state, {posts}) => ({
      ...state,
    posts
    })),

    on(postActions.commentsLoaded, (state, {comments}) => {
      const stateComments = {...state.comments}

      if(comments.length !== 0) {
        stateComments[comments[0].postId] = comments
      }
      return {
        ...state,
        comments: stateComments
      }
    })
  )
})
