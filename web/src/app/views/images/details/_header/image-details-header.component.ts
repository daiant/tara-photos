import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { ButtonComponent } from "../../../../components/button/button.component";

@Component({
  selector: 'tara-image-details-header',
  templateUrl: './image-details-header.component.html',
  styleUrl: './image-details-header.component.css',
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class ImageDetailsHeaderComponent {
  @Output() onDelete = new EventEmitter<Event>();
  @Output() onDownload = new EventEmitter<Event>();
  @Output() onClose = new EventEmitter<Event>();
}  