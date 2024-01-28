import { PORT } from "../../server.constants"

export const AUTH_URL = "http://localhost:" + PORT + "/auth"
export const LOGIN_URL = AUTH_URL + "/login"
export const USER_INFO_URL = AUTH_URL + "/userinfo"