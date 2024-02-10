import { Injectable } from "@angular/core";
import { LOGIN_URL, REGISTER_URL, USER_INFO_URL } from "./constants/users.constants";
import { commonHeaders } from "../utils/headers/headers.utils";

@Injectable({ providedIn: "root" })
export class UserService {
  async login(formData: FormData): Promise<string> {
    return await fetch(LOGIN_URL, { method: "POST", body: formData }).then(response => response.ok ? response.text() : "").catch(error => {
      console.error(error);
      return ""
    })
  }
  async register(formData: FormData): Promise<string> {
    return await fetch(REGISTER_URL, { method: 'POST', body: formData }).then(response => {
      if (!response.ok) return '';
      return this.login(formData);
    }).catch(error => {
      console.log(error); return '';
    });
  }
  async getUserInfo() {
    return await fetch(USER_INFO_URL, { headers: commonHeaders() }).then(response => response.ok ? response.text() : "").catch(error => {
      console.error(error);
      return ""
    })
  }
}