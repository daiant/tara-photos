import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'tara-time-header',
  templateUrl: './time.component.html',
  styleUrl: './time.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class TimeHeader implements OnInit {
  weekFormat = new Intl.DateTimeFormat('es', { weekday: 'long' })
  monthFormat = new Intl.DateTimeFormat('es', { weekday: 'short', day: '2-digit', month: 'short' });
  yearFormat = new Intl.DateTimeFormat('es', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  relativeDayFormat = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  formatedDate: string = '';
  @Input() date?: number;

  ngOnInit(): void {
    if (!this.date) return;
    const date = new Date(this.date)
    this.formatedDate = this.calculateFormattedDate(date);

  }

  calculateFormattedDate(date: Date): string {
    const currentDate = new Date();
    const diffYear = this.calculateYearDifference(currentDate, date);
    // Different year
    if (diffYear > 0) {
      return this.yearFormat.format(date);
    }
    const diffDays = this.calculateDayDifference(currentDate, date);
    // Different week
    if (diffDays > 7) {
      return this.monthFormat.format(date);
    }
    // Same week
    if (diffDays > 2) {
      return this.weekFormat.format(date)
    }
    // Yesterday or today
    return this.relativeDayFormat.format(-1 * diffDays, 'days');
  }

  calculateDayDifference(firstDate: Date, lastDate: Date): number {
    const timeDiff = firstDate.getTime() - lastDate.getTime();
    return Math.round
      (timeDiff / (1000 * 3600 * 24));
    return -1;
  }
  calculateYearDifference(firstDate: Date, lastDate: Date): number {
    return firstDate.getFullYear() - lastDate.getFullYear();
  }
}