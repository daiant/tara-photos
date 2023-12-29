import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../lib/users/user.service";
import { TokenService } from "../../../lib/token/token.service";

@Component({
  selector: "tara-login",
  template: `<h1>Login</h1><button (click)="setToken()">Set token</button>`
})
export class LoginComponent {
  tokenService = inject(TokenService)
  userService = inject(UserService)
  router = inject(Router);
  setToken() {
    const formData = new FormData()
    formData.append("email", "holaaaaa")
    formData.append("password", "hehieiheieheih")
    this.userService.login(formData).then(data => {
      if (!data) return;
      this.tokenService.persistToken(data);
      this.userService.getUserInfo().then(data => {
        this.tokenService.persistItem("user", data)
      })
      this.router.navigate(["/"])
    })
  }

}