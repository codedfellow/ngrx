import { Post } from "src/app/models/posts.model"

export interface PostsState{
    posts: Post[]
}

export const initialState: PostsState = {
    posts: [
        { id: 1, title: 'Sample Post', description: 'Sample description' },
        { id: 2, title: 'Sample Post 2', description: 'Sample description 2' },
        { id: 3, title: 'Sample Post 3', description: 'Sample description 3' }
    ]
}