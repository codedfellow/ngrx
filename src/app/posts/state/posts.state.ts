import { NonNullAssert } from "@angular/compiler"
import { createEntityAdapter, EntityState } from "@ngrx/entity"
// import { createEntityAdapter } from "@ngrx/entity/src"
import { Post } from "src/app/models/posts.model"

// export interface PostsState{
//     posts: Post[]
// }

export interface PostsState extends EntityState<Post> {
    count: number;
}

// export const initialState: PostsState = {
//     posts: [
//         { id: 1, title: 'Sample Post', description: 'Sample description' },
//         { id: 2, title: 'Sample Post 2', description: 'Sample description 2' },
//         { id: 3, title: 'Sample Post 3', description: 'Sample description 3' }
//     ]
// }

export const postsAdapter = createEntityAdapter<Post>({
    // selectId: (post: Post) => post.id
    sortComparer: sortByName
})

//sort by ascending
// export function sortByName(a: Post, b: Post): number {
//     return a.title.localeCompare(b.title);
// }

//sort by descending
export function sortByName(a: Post, b: Post): number {
    const compare = a.title.localeCompare(b.title);

    if (compare > 0) {
        return -1;
    }

    if (compare < 0) {
        return 1;
    }

    return compare;
}
// export const initialState: PostsState = {
//     posts: []
// }
export const initialState: PostsState = postsAdapter.getInitialState({
    count: 0
});