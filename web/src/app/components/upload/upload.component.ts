import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild, inject } from "@angular/core";
import { FileMetadata } from "../../../lib/files/types/file.type";
import { FileService } from "../../../lib/files/file.service";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "tara-upload",
  templateUrl: "./upload.component.html",
  styleUrl: "./upload.component.css",
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class UploadComponent {
  openUpload($event: Event) {
    $event.preventDefault();
    this.inputFileElement.nativeElement.click()
    $event.stopPropagation();
  }
  @ViewChild('label') inputFileElement!: ElementRef<HTMLLabelElement>;
  triggerSubmit(event: Event) {
    const form = (event.target as HTMLInputElement).parentElement as HTMLFormElement;
    this.handleSubmit(form);
    event.stopPropagation();
  }
  files: Array<FileMetadata> = [];
  fileService = inject(FileService);

  async handleSubmit(form: HTMLFormElement) {
    const formData = new FormData(form);
    await this.fileService.uploadFiles(formData);
    form.reset();
  }
}