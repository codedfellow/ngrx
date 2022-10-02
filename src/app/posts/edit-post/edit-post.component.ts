import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscribable, Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postSubscription: Subscription = new Subscription();
  postForm: FormGroup;
  constructor(private route: ActivatedRoute, private store: Store<AppState>,private fb: FormBuilder) { 
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
      const id = Number(params.get('id'));
      this.store.select(getPostById, { id }).subscribe(data => {
        this.post = data;
        // console.log('selected post...', this.post);
        this.initializeFormVal();
      });
    })
  }

  initializeFormVal() {
    this.postForm.patchValue({
      title: this.post?.title,
      description: this.post?.description
    })
  }

  onUpdatePost() {
    
  }
}
