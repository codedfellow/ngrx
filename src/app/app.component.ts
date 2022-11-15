import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';
import { AppState } from './store/app.state';
import { setErrorMessage } from './store/shared/shared.actions';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-tut';
  showLoading: Observable<boolean> = new Observable<boolean>();
  errorMessage: Observable<string> = new Observable<string>();

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);

    this.store.dispatch(autoLogin())
  }

  constructor(private store: Store<AppState>) {
  }

  clearErrorMessage() {
    this.store.dispatch(setErrorMessage({message:''}));
  }
}
