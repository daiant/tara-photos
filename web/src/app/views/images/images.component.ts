import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DOWNLOAD_URL } from '../../../lib/files/constants/file.constants';
import { FileService } from '../../../lib/files/file.service';
import { FileType } from '../../../lib/files/types/file.type';
import { ImageDetailsComponent } from '../../components/image-detail/image-detail.component';
import { ThumbnailComponent } from '../../components/thumbnail/thumbnail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThumbnailComponent, ImageDetailsComponent],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit {

  fileService = inject(FileService);
  title = 'Tara Photos';
  files: Array<FileType> = [];
  detailsVisibility = false;
  detailsFile: FileType | undefined;

  ngOnInit() {
    this._updateFiles();
  }

  parseDate(file: FileType): string {
    return new Intl.DateTimeFormat("es", { day: "2-digit", month: "long", "year": "numeric" }).format(file.Created_at)
  }
  isNewDate(index: number): boolean {
    if (index <= 0) {
      return true;
    }
    const currDate = new Date(this.files[index].Created_at);
    const prevDate = new Date(this.files[index - 1].Created_at);
    return currDate.getFullYear() != prevDate.getFullYear() ||
      currDate.getMonth() != prevDate.getMonth() ||
      currDate.getDate() != prevDate.getDate()
  }

  async _updateFiles() {
    this.files = (await this.fileService.getAll()).sort((a, b) => {
      return b.Created_at - a.Created_at
    });
  }
  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    await this.fileService.uploadFiles(form);
    this._updateFiles();
    (event.target as HTMLFormElement).reset();
  }
  async handleImageDelete(file: FileType) {
    await this.fileService.deleteFile(file.Id);
    this.handleCloseDetails();
    this._updateFiles();
  }

  handleChangeImage(direction: 1 | -1) {
    const currentFileIndex = this.files.findIndex(f => f.Id === this.detailsFile?.Id);
    if (Boolean(this.files[currentFileIndex + 1 * direction])) {
      this.detailsFile = this.files[currentFileIndex + 1 * direction]
    }
  }
  handleImgDetails(file: FileType) {
    this.detailsFile = file;
    this.detailsVisibility = true;
  }
  handleCloseDetails() {
    this.detailsFile = undefined;
    this.detailsVisibility = false;
  }
}
