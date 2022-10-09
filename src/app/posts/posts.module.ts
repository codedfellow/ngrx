import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { StoreModule } from "@ngrx/store";
import { postsReducer } from "./state/posts.reducer";
import { POST_STATE_NAME } from "./state/posts.selector";

const routes: Routes = [
    {
        path: '', component: PostsListComponent, children: [
            { path: 'add', component: AddPostComponent },
            { path: 'edit/:id', component: EditPostComponent }
        ]
    }
]

@NgModule({
    declarations: [
        PostsListComponent,
        AddPostComponent,
        EditPostComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(POST_STATE_NAME,postsReducer)
    ]
})

export class PostsModule { }