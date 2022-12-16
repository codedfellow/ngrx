import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity/public_api";
import { RouterNavigatedAction, routerNavigatedAction, routerNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { filter, map, mergeMap, switchMap } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { PostsService } from "src/app/services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects{
    constructor(private actions$: Actions, private postsService: PostsService) { }
    
    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadPosts),
            mergeMap((action) => {
                return this.postsService.getPosts().pipe(map((posts) => {
                    // console.log('posts...',data)
                    return loadPostsSuccess({posts})
                }))
            })
        )
    })

    addPost$ = createEffect(() => {
        return this.actions$.pipe(ofType(addPost), mergeMap(action => {
            return this.postsService.addPost(action.post).pipe(map(data => {
                console.log('posted...', data);
                const post = { ...action.post, id: data.name };
                return addPostSuccess({post});
            }))
        }))
    })

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(updatePost), switchMap((action) => {
            return this.postsService.updatePost(action.post).pipe(map(data => {
                const updatedPost: Update<Post> = {
                    id: String(action.post.id),
                    changes: action.post
                }
                // return updatePostSuccess({ post: action.post })
                return updatePostSuccess({ post: updatedPost })
            }))
        }))
    })

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(deletePost), switchMap((action) => {
            return this.postsService.deletePost(action.id).pipe(map(data => {
                return deletePostSuccess({ id: action.id })
            }))
        }))
    })

    getSinglePost$ = createEffect(() => {
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                // console.log('state one...', r);
            return r.payload.routerState.url.startsWith('/posts/details');
            }),
            map((r: any) => {
                // console.log('log router state...', r);
                return r.payload.routerState['params']['id'];
            }),
            switchMap((id) => {
                return this.postsService.getPostById(id).pipe(map((post) => {
                    const postData = [{ ...post, id }];
                    return loadPostsSuccess({ posts: postData });
                }))
            })
        )
    })
}