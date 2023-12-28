import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ImageDetailsComponent } from './components/image-detail/image-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ThumbnailComponent, ImageDetailsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  router = inject(Router);
  ngOnInit(): void {
    const url = new URL(window.location.href).pathname;
    if (!url.includes("/login")) { this._checkToken() }
  }
  _checkToken() {
    const token = globalThis.localStorage.getItem("token");
    if (!token) this.router.navigate(["/login"]);
  }
  get isLoggedIn() {
    return globalThis.localStorage.getItem("token");
  }
}
