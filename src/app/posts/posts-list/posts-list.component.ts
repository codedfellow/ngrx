import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../state/posts.actions';
import { getCount, getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]> = new Observable<Post[]>;
  count: Observable<number> = new Observable<number>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
    this.count = this.store.select(getCount);
  }

  onDeletePost(id: string | undefined) {
    if (confirm('Are you sure you want to delete post?')) {
      let passId = String(id);
      console.log('delete post');
      this.store.dispatch(deletePost({id: passId }));
    }
  }
}