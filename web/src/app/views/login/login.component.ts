import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../lib/users/user.service";
import { TokenService } from "../../../lib/token/token.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: "tara-login",
  templateUrl: "./login.component.html",
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class LoginComponent {
  tokenService = inject(TokenService)
  userService = inject(UserService)
  router = inject(Router);
  loading = false;
  error?: string;
  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.loading = true;
    const formData = new FormData(event.target as HTMLFormElement);
    this.userService.login(formData).then(data => {
      this.loading = false;
      if (!data) {
        this._showError();
        return;
      };
      this.error = undefined;
      this.tokenService.persistToken(data);
      this.userService.getUserInfo().then(data => {
        this.tokenService.persistItem("user", data)
      });
      this.router.navigate(["/"]);
    }).catch(error => {
      this.loading = false;
      this._showError();
    });
  }
  _showError() {
    this.error = 'Ha ocurrido un error.'
  }
}