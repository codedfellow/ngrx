import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
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
    
  }
  ngOnInit(): void {
  }

}
