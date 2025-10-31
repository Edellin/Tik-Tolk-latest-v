import { postActions } from "./store/action";
import { PostEffects } from "./store/effects";
import {postFeature, PostState } from "./store/reducer";
import { selectAllPosts, selectCommentsByPostId } from "./store/selectors";

export {
  postActions,
  PostEffects,
  postFeature,
  selectAllPosts,
  selectCommentsByPostId
};
export type { PostState };
