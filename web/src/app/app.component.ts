import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ImageDetailsComponent } from './components/image-detail/image-detail.component';
import { TokenService } from '../lib/token/token.service';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from "./components/aside/aside.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: "./app.component.css",
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ThumbnailComponent,
    ImageDetailsComponent,
    HeaderComponent,
    AsideComponent,
  ]
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
  get isLoggedIn(): boolean {
    return Boolean(this.tokenService.getToken());
  }
}
