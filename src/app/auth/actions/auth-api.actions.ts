import { createAction } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";

export const getAuthStatusSuccess = createAction(
    "[Login API] Get Status Success",
    (user: UserModel | null) => ({ user })
);

export const loginSuccess = createAction(
    "[Login API] Login Success",
    (user: UserModel) => ({ user })
);

export const loginFailed = createAction(
    "[Login API] Login Failed",
    (reason: string) => ({ reason })
);