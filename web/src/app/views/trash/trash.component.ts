import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { DOWNLOAD_URL } from "../../../lib/files/constants/file.constants";
import { FileService } from "../../../lib/files/file.service";
import { FileMetadata } from "../../../lib/files/types/file.type";
import { ImageDetailsComponent } from "../images/details/image-details.component";
import { ThumbnailComponent } from "../../components/thumbnail/thumbnail.component";
import { TimeHeader } from "../../components/time/time.component";

@Component({
  selector: "tara-trash",
  standalone: true,
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
  imports: [CommonModule, RouterModule, RouterOutlet, ThumbnailComponent, ImageDetailsComponent, TimeHeader]
})
export class TrashComponent {
  handleImgDetails($event: FileMetadata) {
    throw new Error('Method not implemented.');
  }
  isNewDate(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  fileService = inject(FileService);
  title = 'Tara Photos';
  files: Array<FileMetadata> = [];
  detailsVisibility = false;
  detailsFile: FileMetadata | undefined;

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
  setImgDetails(file: FileMetadata) {
    this.detailsFile = file;
    this.detailsVisibility = true;
  }
  handleCloseDetails() {
    this.detailsFile = undefined;
    this.detailsVisibility = false;
  }
  async handleImageDelete(file: FileMetadata) {
    await this.fileService.deleteFile(file.Id);
    this.handleCloseDetails();
    this._updateFiles();
  }

}