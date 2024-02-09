import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { TokenService } from '../lib/token/token.service';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from "./components/aside/aside.component";
import { UploadProgressComponent } from "./components/upload-progress/upload-progress.component";
import { FileService } from '../lib/files/file.service';

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
    HeaderComponent,
    AsideComponent,
    UploadProgressComponent,
  ]
})
export class AppComponent implements OnInit {
  loading = true;
  router = inject(Router);
  tokenService = inject(TokenService);
  fileService = inject(FileService);

  ngOnInit(): void {
    const url = new URL(window.location.href).pathname;
    if (!url.includes("/login")) { this._checkToken() }
    else this.loading = false;
    this.fileService.fileUploading$.subscribe((files) => {
      this.isProgressVisible = Boolean(files.length);
      this.progressFiles = files;
    })
  }

  _checkToken() {
    const token = this.tokenService.getToken();
    this.loading = false;
    if (!token) this.router.navigate(["/login"]);
  }

  get isLoggedIn(): boolean {
    return Boolean(this.tokenService.getToken());
  }

  // upload files lookup service
  isProgressVisible: boolean = false;
  progressFiles: File[] | undefined;
}
