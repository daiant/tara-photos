import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FileService } from "../../../lib/files/file.service";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DOWNLOAD_URL, THUMBNAIL_URL } from "../../../lib/files/constants/file.constants";
import { FileType } from "../../../lib/files/types/file.type";

@Component({
  selector: "tara-image-thumbnail",
  template: `<img src={{getFile()}} alt="" (click)="showDetails.emit(file)" />`,
  styles: "img { width: auto; height: 300px; }",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class ThumbnailComponent {
  @Input() file?: FileType;
  @Output() showDetails = new EventEmitter<FileType>;
  getFile() {
    return this.file ?
      this.file.Thumbnail.Valid ?
        THUMBNAIL_URL + this.file.Thumbnail.String :
        DOWNLOAD_URL + this.file.Filename :
      "/placeholder.webp"
  }
}