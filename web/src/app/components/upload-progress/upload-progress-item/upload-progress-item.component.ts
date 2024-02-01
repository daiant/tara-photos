import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tara-upload-progress-item',
  templateUrl: './upload-progress-item.component.html',
  styleUrl: './upload-progress-item.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class UploadProgressComponentItem implements OnInit {
  @Input() file?: File;
  progress = 0;

  ngOnInit() {
    this.beginMockProgress();
  }

  beginMockProgress(): void {
    const interval = setInterval(() => {
      this.progress += Math.min(Math.floor(Math.random() * (10 - 1) + 1), 100);
      if (this.progress === 100) {
        clearInterval(interval);
      };
    }, 200);
  }
}