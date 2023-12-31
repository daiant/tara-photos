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
  triggerSubmit(event: Event) {
    const form = (event.target as HTMLInputElement).parentElement as HTMLFormElement;
    this.handleSubmit(form);
  }
  files: Array<FileType> = [];
  fileService = inject(FileService);

  async handleSubmit(form: HTMLFormElement) {
    const formData = new FormData(form);
    await this.fileService.uploadFiles(formData);
    form.reset();
  }
}