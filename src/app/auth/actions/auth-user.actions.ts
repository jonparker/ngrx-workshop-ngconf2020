import { createAction } from "@ngrx/store";

export const login = createAction(
    "[Login Page] Login",
    (username: string, password: string) => ({ username, password })
);

export const logout = createAction("[Login Page] Logout");