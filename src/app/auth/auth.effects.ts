import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, tap, concatMap, catchError } from "rxjs/operators";
import { AuthService } from "../shared/services/auth.service";
import { AuthApiActions, AuthUserActions } from "./actions";
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private authService: AuthService){
    }

    getAuthStatus$ = createEffect(() => 
        this.authService
            .getStatus()
            .pipe(map(userOrNull => AuthApiActions.getAuthStatusSuccess(userOrNull))
        )
    );

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthUserActions.login),
            concatMap(action => {
                return this.authService.login(action.username, action.password).pipe(
                    map(user => AuthApiActions.loginSuccess(user)),
                    catchError(reason => of(AuthApiActions.loginFailed(reason)))
                );
            })
        )
    );

    $logout = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthUserActions.logout),
            tap(() => this.authService.logout())
        ),
        { dispatch: false }
    );
}