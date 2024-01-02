import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../lib/users/user.service";
import { TokenService } from "../../../lib/token/token.service";

@Component({
  selector: "tara-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  tokenService = inject(TokenService)
  userService = inject(UserService)
  router = inject(Router);
  handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement);
    this.userService.login(formData).then(data => {
      if (!data) return;
      this.tokenService.persistToken(data);
      this.userService.getUserInfo().then(data => {
        this.tokenService.persistItem("user", data)
      });
      this.router.navigate(["/"])
    });
  }
}