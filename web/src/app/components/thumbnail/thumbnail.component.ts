import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from "@angular/core";
import { FileService } from "../../../lib/files/file.service";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FileType } from "../../../lib/files/types/file.type";

@Component({
  selector: "tara-image-thumbnail",
  templateUrl: "./thumbnail.component.html",
  styleUrl: "./thumbnail.component.css",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class ThumbnailComponent implements OnInit {
  fileService = inject(FileService);
  src = "";
  @Input() file?: FileType;
  @Output() showDetails = new EventEmitter<FileType>;
  ngOnInit() {
    this.getFile()
  }
  async getFile() {
    const blob = await this.fileService.getThumbnail(this.file) as Blob | null;
    if (!blob) return;
    this.src = URL.createObjectURL(blob);
  }
}