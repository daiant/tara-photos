import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../../../../../components/button/button.component";

@Component({
  selector: 'tara-image-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class ImageDetailDeleteDialog {
  @Input() visible?: boolean;
  @Output() onCancel = new EventEmitter<Event>();
  @Output() onConfirm = new EventEmitter<Event>();
}