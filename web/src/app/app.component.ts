import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ImageDetailsComponent } from './components/image-detail/image-detail.component';
import { TokenService } from '../lib/token/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ThumbnailComponent, ImageDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  loading = true;
  router = inject(Router);
  tokenService = inject(TokenService);
  ngOnInit(): void {
    const url = new URL(window.location.href).pathname;
    if (!url.includes("/login")) { this._checkToken() }
    else this.loading = false;
  }
  _checkToken() {
    const token = this.tokenService.getToken();
    this.loading = false;
    if (!token) this.router.navigate(["/login"]);
  }
  get isLoggedIn() {
    return this.tokenService.getToken();
  }
  get user(): string {
    const idToken = this.tokenService.getItem("user")
    if (!idToken) return ""
    return this.getUserByToken(idToken)?.Username ?? ""
  }
  getUserByToken(token: string): { Username: string } | undefined {
    const user_info = atob(token.split(".")[1])
    try {
      return JSON.parse(user_info);
    } catch (error) {
      console.log('👻 ~ getUserByToken ~ error:', error);
      return undefined;
    }
  }

}
