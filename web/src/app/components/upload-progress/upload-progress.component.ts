import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { UploadProgressComponentItem } from "./upload-progress-item/upload-progress-item.component";

@Component({
  selector: 'tara-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrl: './upload-progress.component.css',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UploadProgressComponentItem]
})
export class UploadProgressComponent {
  getFileProgress() {
    return 2;
  }
  @Input() visible?: boolean = true;
  files?: File[] = [{
    name: 'pipoadf adofa dasf asd fasod fa.mp4',
    size: 0,
    lastModified: new Date().getTime(),
  } as File];
}