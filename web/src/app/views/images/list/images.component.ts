import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FileService } from '../../../../lib/files/file.service';
import { FileMetadata } from '../../../../lib/files/types/file.type';
import { ImageDetailsComponent } from '../details/image-details.component';
import { ThumbnailComponent } from '../../../components/thumbnail/thumbnail.component';
import { TimeHeader } from "../../../components/time/time.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
  imports: [CommonModule, RouterOutlet, ThumbnailComponent, ImageDetailsComponent, TimeHeader]
})
export class ImagesComponent implements OnInit {

  fileService = inject(FileService);
  title = 'Tara Photos';
  files: Array<FileMetadata> = [];
  detailsVisibility = false;
  detailsFile: FileMetadata | undefined;

  ngOnInit() {
    this._updateFiles();
    this.fileService.fileChanges$.subscribe(() => this._updateFiles())
  }

  parseDate(file: FileMetadata): string {
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
    this.files = (await this.fileService.getAll())?.sort((a, b) => {
      return b.Created_at - a.Created_at
    });
  }
  router = inject(Router)
  handleImgDetails(file: FileMetadata) {
    this.router.navigate(['photo', file.Id]);
  }
}
