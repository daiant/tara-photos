import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FileType } from "../../../lib/files/types/file.type";
import { FileService } from "../../../lib/files/file.service";

@Component({
  selector: "tara-upload",
  templateUrl: "./upload.component.html",
  styleUrl: "./upload.component.css",
  standalone: true,
  imports: [CommonModule]
})
export class UploadComponent {
  files: Array<FileType> = [];
  fileService = inject(FileService);

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    await this.fileService.uploadFiles(form);
    (event.target as HTMLFormElement).reset();
  }
}