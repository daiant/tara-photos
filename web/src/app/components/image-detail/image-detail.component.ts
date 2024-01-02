import { Component, EventEmitter, Input, OnChanges, Output, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FileType } from "../../../lib/files/types/file.type";
import { FileService } from "../../../lib/files/file.service";

@Component({
  selector: 'tara-image-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./image-detail.component.html",
  styleUrls: ["./image-detail.component.css"],
})
export class ImageDetailsComponent implements OnChanges {
  deleteAlertVisibility = false;
  src = '';
  fileService = inject(FileService);
  @Input() file?: FileType;
  @Output() onDelete = new EventEmitter<FileType>
  @Output() onClose = new EventEmitter<void>;
  @Output() onChangeRequest = new EventEmitter<1 | -1>;

  ngOnChanges(): void {
    this.getFile();
  }
  async getFile() {
    const blob = await this.fileService.getImage(this.file) as Blob | null;
    if (!blob) return;
    this.src = URL.createObjectURL(blob);
  }
  handleDeleteAlert() {
    this.deleteAlertVisibility = true;
  }
  handleDelete() {
    this.onDelete.emit(this.file);
    this.deleteAlertVisibility = false;
    this.onClose.emit();
  }
  handleClose() {
    this.onClose.emit();
  }
  handlePrevious() {
    this.onChangeRequest.emit(-1)
  }
  handleNext() {
    this.onChangeRequest.emit(1)
  }
}