import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FileType } from "../../../../lib/files/types/file.type";
import { FileService } from "../../../../lib/files/file.service";

@Component({
  selector: 'tara-image-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./image-details.component.html",
  styleUrls: ["./image-details.component.css"],
})
export class ImageDetailsComponent implements OnInit {
  deleteAlertVisibility = false;
  src = '';
  route = inject(ActivatedRoute);
  fileService = inject(FileService);
  @Input() file?: FileType;
  @Output() onDelete = new EventEmitter<FileType>
  @Output() onClose = new EventEmitter<void>;
  @Output() onChangeRequest = new EventEmitter<1 | -1>;

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (!id) return;
    this.getFile(id);
  }
  async getFile(id: string) {
    const blob = await this.fileService.getImage(id) as Blob | null;
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