import { Action, createReducer, on } from "@ngrx/store"
import { addPost, updatePost } from "./posts.actions"
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
}), on(updatePost, (state, action) => {
    const updatedPosts = state.posts.map(x => {
        return action.post.id == x.id ? action.post : x;
    })

    return {
        ...state,
        posts: updatedPosts
    }
}))

export function postsReducer(state: PostsState | undefined, action: Action) {
    return _postsReducer(state,action)
}