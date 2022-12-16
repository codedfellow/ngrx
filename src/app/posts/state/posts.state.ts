import { NonNullAssert } from "@angular/compiler"
import { createEntityAdapter, EntityState } from "@ngrx/entity"
// import { createEntityAdapter } from "@ngrx/entity/src"
import { Post } from "src/app/models/posts.model"

// export interface PostsState{
//     posts: Post[]
// }

export interface PostsState extends EntityState<Post> {}

// export const initialState: PostsState = {
//     posts: [
//         { id: 1, title: 'Sample Post', description: 'Sample description' },
//         { id: 2, title: 'Sample Post 2', description: 'Sample description 2' },
//         { id: 3, title: 'Sample Post 3', description: 'Sample description 3' }
//     ]
// }

export const postsAdapter = createEntityAdapter<Post>()
// export const initialState: PostsState = {
//     posts: []
// }
export const initialState: PostsState = postsAdapter.getInitialState();