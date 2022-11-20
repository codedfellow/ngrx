import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscribable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { updatePost } from '../state/posts.actions';
import { gePostByIdNew, getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postSubscription: Subscription = new Subscription();
  postForm: FormGroup;
  constructor(private route: ActivatedRoute, private store: Store<AppState>,private fb: FormBuilder,private router: Router) { 
    this.post = {
      title: '',
      description:''
    };

    this.postForm = this.fb.group({
      title: ['',[Validators.required,Validators.minLength(6)]],
      description: ['',[Validators.required,Validators.minLength(10)]]
    })
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.postSubscription = this.route.paramMap.subscribe(params => {
      console.log('edit route params...', params.get('id'));
      const id = String(params.get('id'));
      // this.store.select(getPostById, { id }).subscribe(data => {
      //   this.post = data;
      //   // console.log('selected post...', this.post);
      //   this.initializeFormVal();
      // });
      
      this.store.select(gePostByIdNew(id)).subscribe(data => {
        this.post = data;
        // console.log('selected post...', this.post);
        this.initializeFormVal();
      });
    })
  }

  onSubmit() {
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post?.id,
      title,
      description
    };

    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }

  initializeFormVal() {
    this.postForm.patchValue({
      title: this.post?.title,
      description: this.post?.description
    })
  }
}
