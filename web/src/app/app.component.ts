import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { ImageDetailsComponent } from './components/image-detail/image-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ThumbnailComponent, ImageDetailsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

}
