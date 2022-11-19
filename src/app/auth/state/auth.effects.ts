import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects{
    
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>,private router: Router) { }
    
    login$ = createEffect(() => {
        return this.actions$
            .pipe(ofType(loginStart),
                exhaustMap(action => {
                    return this.authService
                        .login(action.email, action.pasword)
                        .pipe(map(data => {
                            const user = this.authService.formatUser(data);
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            this.store.dispatch(setErrorMessage({ message: '' }))
                            this.authService.setUserInLocalStorage(user);
                            return loginSuccess({user, redirect: true})
                        }), catchError(err => {
                            console.log('err...', err.error.error.message);
                            this.store.dispatch(setLoadingSpinner({ status: false }))
                            const erroMessage = this.authService.getErrorMessage(err.error.error.message);
                            return of(setErrorMessage({message:erroMessage}));
                        }))
                }))
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(...[loginSuccess,signupSuccess]), tap((action) => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            if (action.redirect) {
                this.router.navigate(['/']);    
            }
            
        }))
    }, { dispatch: false });

    // signUpRedirect$ = createEffect(() => {
    //     return this.actions$.pipe(ofType(signupSuccess), tap((action) => {
    //         this.store.dispatch(setErrorMessage({ message: '' }))
    //         this.router.navigate(['/']);
    //     }))
    // }, { dispatch: false });

    signUp$ = createEffect(() => {
        return this.actions$.pipe(ofType(signupStart), exhaustMap(action => {
            return this.authService.signUp(action.email, action.password).pipe(map(data => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                const user = this.authService.formatUser(data);
                this.authService.setUserInLocalStorage(user);
                return signupSuccess({ user, redirect: true });
            }), catchError(err => {
                console.log('err...', err.error.error.message);
                this.store.dispatch(setLoadingSpinner({ status: false }))
                const erroMessage = this.authService.getErrorMessage(err.error.error.message);
                return of(setErrorMessage({ message: erroMessage }));
            }))
        }))
    });

    // autoLogin$ = createEffect(() => {
    //     return this.actions$.pipe(ofType(autoLogin),
    //         map((action) => {
    //             const user = this.authService.getUserFromLocalStorage();
    //             console.log('user from auto login...', user);
    //         }))
    // }, { dispatch: false })
    
    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.getUserFromLocalStorage();
                // console.log('user from auto login...', user);
                return of(loginSuccess({user, redirect: false}));
            }))
    })

    logout$ = createEffect(() => {
        return this.actions$.pipe(ofType(autoLogout),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['auth']);
            })
        )
    },{dispatch: false})
}