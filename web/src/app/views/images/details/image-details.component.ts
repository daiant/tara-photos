import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { FileMetadata } from "../../../../lib/files/types/file.type";
import { FileService } from "../../../../lib/files/file.service";
import { ImageDetailsHeaderComponent } from "./_header/image-details-header.component";
import { ImageDetailDeleteDialog } from "./_dialog/delete/delete-dialog.component";
import { ButtonComponent } from "../../../components/button/button.component";

@Component({
  selector: 'tara-image-details',
  standalone: true,
  templateUrl: "./image-details.component.html",
  styleUrls: ["./image-details.component.css"],
  imports: [CommonModule, ImageDetailsHeaderComponent, ImageDetailDeleteDialog, ButtonComponent]
})
export class ImageDetailsComponent implements OnInit {

  isDialogVisible = false;
  src = '';
  route = inject(ActivatedRoute);
  router = inject(Router);
  fileService = inject(FileService);
  file: FileMetadata | null = null;
  previousFile: FileMetadata | null = null;
  nextFile: FileMetadata | null = null;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params["id"]
      if (!id) return;
      this.getFile(id);
      this.getNextAndPrevious(id);
    });
  }
  getNextAndPrevious(id: number) {
    this.fileService.getAll().then((files) => {
      const fileIndex = files.findIndex(f => f.Id == id);
      this._getPrevious(files, fileIndex);
      this._getNext(files, fileIndex);

    });
  }
  _getPrevious(files: FileMetadata[], id: number) {
    if (id > 0) this.previousFile = files[id - 1]
    else this.previousFile = files[files.length - 1];
  }
  _getNext(files: FileMetadata[], id: number) {
    if (id < files.length - 1) this.nextFile = files[id + 1];
    else this.nextFile = files[0];
  }

  async getFile(id: string) {
    const blob = await this.fileService.getImage(id) as Blob | null;
    if (!blob) return;
    this.src = URL.createObjectURL(blob);
    this.file = await this.fileService.getById(parseInt(id));

  }

  handleDeleteAlert($event: Event) {
    $event.preventDefault();
    this.isDialogVisible = true;
    $event.stopPropagation();
  }

  handleDelete($event: Event) {
    $event.preventDefault();
    if (!this.file?.Id) return;
    this.fileService.deleteFile(this.file?.Id).then((_response: void) => {
      this.isDialogVisible = false;
      this.handleClose($event);
    });
    $event.stopPropagation();
  }

  handleClose($event: Event) {
    // www.domain.com/photo/1 -> remove photo/1
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

  handleDownload($event: Event) {
    $event.preventDefault();
    const a = document.createElement('a');
    a.download = this.file?.Filename ?? '';
    a.href = this.src;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    $event.stopPropagation();
  }
  handleNext($event: Event) {
    if (!this.nextFile) return;
    this.router.navigate(['../', this.nextFile.Id], { relativeTo: this.route })
    $event.stopPropagation();
  }
  handlePrevious($event: Event) {
    if (!this.previousFile) return;
    this.router.navigate(['../', this.previousFile.Id], { relativeTo: this.route })
    $event.stopPropagation();
  }
}