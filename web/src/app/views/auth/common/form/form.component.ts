import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tara-auth-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class TaraAuthFormComponent {
  @Output() onSubmit = new EventEmitter<FormData>();
  handleSubmit($event: SubmitEvent) {
    $event?.preventDefault()
    this.onSubmit.emit(new FormData(($event.target as HTMLFormElement)));
  }

}