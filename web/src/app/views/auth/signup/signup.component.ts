import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaraAuthFormComponent } from "../common/form/form.component";
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../../lib/token/token.service';
import { UserService } from '../../../../lib/users/user.service';

@Component({
  selector: 'tara-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true,
  imports: [CommonModule, TaraAuthFormComponent, RouterLink],
})
export class SignupComponent {
  tokenService = inject(TokenService)
  userService = inject(UserService)
  router = inject(Router);
  loading = false;
  error?: string;
  handleSubmit(event: FormData) {
    this.loading = true;
    this.userService.register(event).then(data => {
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