import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.email, Validators.required]],
    //   password: ['',[Validators.required]]
    //   })
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    })
   }

  onLogin() {
    this.store.dispatch(setLoadingSpinner({status: true}))
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(loginStart({ email, pasword: password }));
  }
  ngOnInit(): void {
  }

}
