import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../../../../lib/users/user.service";
import { TokenService } from "../../../../lib/token/token.service";
import { CommonModule } from '@angular/common';
import { TaraAuthFormComponent } from "../common/form/form.component";

@Component({
  selector: "tara-login",
  templateUrl: "./login.component.html",
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule, TaraAuthFormComponent, RouterLink]
})
export class LoginComponent {
  tokenService = inject(TokenService)
  userService = inject(UserService)
  router = inject(Router);
  loading = false;
  error?: string;
  handleSubmit(event: FormData) {
    this.loading = true;
    this.userService.login(event).then(data => {
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