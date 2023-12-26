import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FileService } from '../lib/files/file.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fileService = inject(FileService);
  title = 'Tara Photos';

  async getFile() {
    const blob = await this.fileService.getById(1);
    console.log('👻 ~ getFile ~ blob:', blob);
  }
}
