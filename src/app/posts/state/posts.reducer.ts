import { Action, createReducer, on } from "@ngrx/store"
import { addPost, addPostSuccess, deletePost, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions"
import { initialState, PostsState } from "./posts.state"

const _postsReducer = createReducer(initialState, on(addPostSuccess, (state,action) => {
    let post = { ...action.post };
    // let postId:string = '';
    // let checkId:string = '';
    // state.posts.forEach(item => {
    //     checkId = String(item.id);
    //     if (checkId >= postId) {
    //         postId = checkId + 1;
    //     }
    // });
    // console.log('current postId...', postId);
    // post.id = postId;

    return {
        ...state,
        posts: [...state.posts,post]
    }
}), on(updatePostSuccess, (state, action) => {
    const updatedPosts = state.posts.map(x => {
        return action.post.id == x.id ? action.post : x;
    })

    return {
        ...state,
        posts: updatedPosts
    }
}), on(deletePost, (state, action) => {
    
    const updatedPosts = state.posts.filter( post => post.id != action.id);
    return {
        ...state,
        posts: updatedPosts
    }
}), on(loadPostsSuccess, (state, action) => {
    return {
        ...state,
        posts: action.posts
    }
}))

export function postsReducer(state: PostsState | undefined, action: Action) {
    return _postsReducer(state,action)
}