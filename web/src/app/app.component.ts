import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FileService } from '../lib/files/file.service';
import { FileType } from '../types/file.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  fileService = inject(FileService);
  title = 'Tara Photos';
  files: Array<FileType> = [];
  img: string = "";

  ngOnInit() {
    this._updateFiles();
  }
  async _updateFiles() {
    this.files = await this.fileService.getAll()
  }
  getFile(filename: string): string {
    return this.fileService.DOWNLOAD_URL + filename
  }
  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    await this.fileService.uploadFile(form);
    this._updateFiles()
  }
}
