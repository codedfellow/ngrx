import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { loadPosts, loadPostsSuccess } from "./posts.actions";

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
}