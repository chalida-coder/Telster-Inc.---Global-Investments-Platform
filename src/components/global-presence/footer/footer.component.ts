import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear: number;

  constructor() {
    // FIX: Moved initialization to the constructor to avoid executing `new Date()` during class definition, which is a best practice.
    this.currentYear = new Date().getFullYear();
  }
}