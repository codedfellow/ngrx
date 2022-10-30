import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { LoginComponent } from './login/login.component';
import { AuthEffects } from "./state/auth.effects";
import { authReducer } from "./state/auth.reducer";
import { AUTH_STATE_NAME } from "./state/auth.selector";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', pathMatch:'full', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
        ]
    }
]
@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature(AUTH_STATE_NAME,authReducer)
    ],
    exports: [

    ]
})

export class AuthModule { }