import { ActionReducer, Action } from "@ngrx/store";
import { AuthUserActions } from "src/app/auth/actions";
import * as fromAuth from './auth.reducer';
import * as fromBooks from './books.reducer';

export function logoutMetareducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state: any, action: Action) {
        if (action.type === AuthUserActions.logout.type)
            return reducer({ books: fromBooks.initialState , auth: fromAuth.initialState }, action);
        return reducer(state, action);
    };
  }