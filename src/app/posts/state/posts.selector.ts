import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./posts.state";

export const POST_STATE_NAME = 'posts';
const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, state => {
    return state.posts;
})

export const getPostById = createSelector(getPostsState, (state: PostsState, props: { id: number}) => {
    return state.posts.find(x => x.id == props.id);
})

export const gePostByIdNew = (id: number) => createSelector(getPostsState, (state) => {
    return state.posts.find(x => x.id == id);
})
