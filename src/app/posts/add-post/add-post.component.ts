import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    description: new FormControl(null,[Validators.required,Validators.minLength(10)])
  });
  constructor(private store: Store<AppState>) { }

  showDescriptionErrors() {
    const description = this.postForm.get('description');
    if (description?.touched && !description.valid) {
      if (description?.errors?.required) {
        return 'description is required';
      }

      if (description?.errors?.minlength) {
        return 'description length must be grater than 10';
      }   
    }
    
    return '';
  }

  onAddPost() {
    console.log('post form...', this.postForm);
   
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };

    this.store.dispatch(addPost({post}))
  }
  ngOnInit(): void {
  }

}
