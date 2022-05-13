import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services';
import * as userActions from '../actions';

@Injectable() 
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {

    }  

    userLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.login),
            exhaustMap(({ user }) =>
                this.userService.login(user).pipe(
                    map(response => userActions.loginSuccess(response)),
                    catchError((error: any) => of(userActions.loginFailure(error)))
                )
            )
        )
    );

    userSignup$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userActions.signup),
            exhaustMap(({ user }) => 
                this.userService.signup(user).pipe(
                    map(response => userActions.signupSuccess(response)),
                    catchError((error: any) => of(userActions.signupFailure(error)))
                )
            )
        )
    );
}