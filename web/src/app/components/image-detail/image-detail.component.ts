import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FileType } from "../../../lib/files/types/file.type";
import { DOWNLOAD_URL } from "../../../lib/files/constants/file.constants";

@Component({
  selector: 'tara-image-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./image-detail.component.html",
  styleUrls: ["./image-detail.component.css"],
})
export class ImageDetailsComponent {
  deleteAlertVisibility = false;
  @Input() file?: FileType;
  @Output() onDelete = new EventEmitter<FileType>
  @Output() onClose = new EventEmitter<void>;

  getFile() {
    return this.file ? DOWNLOAD_URL + this.file.Filename : "/placeholder.webp"
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
}