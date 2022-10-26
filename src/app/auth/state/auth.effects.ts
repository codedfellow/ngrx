import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { loginStart, loginSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects{
    
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>) { }
    
    login$ = createEffect(() => {
        return this.actions$
            .pipe(ofType(loginStart),
                exhaustMap(action => {
                    return this.authService
                        .login(action.email, action.pasword)
                        .pipe(map(data => {
                            const user = this.authService.formatUser(data);
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            this.store.dispatch(setErrorMessage({message:''}))
                            return loginSuccess({user})
                        }), catchError(err => {
                            console.log('err...', err.error.error.message);
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            const erroMessage = this.authService.getErrorMessage(err.error.error.message);
                            return of(setErrorMessage({message:erroMessage}));
                        }))
                }))
    });
}