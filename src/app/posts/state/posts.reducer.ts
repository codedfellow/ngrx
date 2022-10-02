import { Action, createReducer, on } from "@ngrx/store"
import { addPost } from "./posts.actions"
import { initialState, PostsState } from "./posts.state"

const _postsReducer = createReducer(initialState, on(addPost, (state,action) => {
    let post = { ...action.post };
    let postId:number = 0;
    let checkId:number = 0;
    state.posts.forEach(item => {
        checkId = Number(item.id);
        if (checkId >= postId) {
            postId = checkId + 1;
        }
    });
    console.log('current postId...', postId);
    post.id = postId;

    return {
        ...state,
        posts: [...state.posts,post]
    }
}))

export function postsReducer(state: PostsState | undefined, action: Action) {
    return _postsReducer(state,action)
}