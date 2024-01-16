import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "tara-button",
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Output() click = new EventEmitter<void>();
  @Input() variant: 'primary' | 'secondary' = 'primary';
}