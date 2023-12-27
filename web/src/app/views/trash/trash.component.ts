import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { DOWNLOAD_URL } from "../../../lib/files/constants/file.constants";
import { FileService } from "../../../lib/files/file.service";
import { FileType } from "../../../lib/files/types/file.type";
import { ImageDetailsComponent } from "../../components/image-detail/image-detail.component";
import { ThumbnailComponent } from "../../components/thumbnail/thumbnail.component";

@Component({
  selector: "tara-trash",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ThumbnailComponent, ImageDetailsComponent],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent {

  fileService = inject(FileService);
  title = 'Tara Photos';
  files: Array<FileType> = [];
  detailsVisibility = false;
  detailsFile: FileType | undefined;

  ngOnInit() {
    this._updateFiles();
  }
  async _updateFiles() {
    this.files = await this.fileService.getDeleted()
  }
  getFile(filename: string): string {
    return DOWNLOAD_URL + filename
  }
  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    await this.fileService.uploadFiles(form);
    this._updateFiles();
    (event.target as HTMLFormElement).reset();
  }
  setImgDetails(file: FileType) {
    this.detailsFile = file;
    this.detailsVisibility = true;
  }
  handleCloseDetails() {
    this.detailsFile = undefined;
    this.detailsVisibility = false;
  }
  async handleImageDelete(file: FileType) {
    await this.fileService.deleteFile(file.Id);
    this.handleCloseDetails();
    this._updateFiles();
  }

}