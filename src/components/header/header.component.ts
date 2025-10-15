import { ChangeDetectionStrategy, Component, signal, effect, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  styles: [`
    .nav-link {
      position: relative;
      transition: color 0.3s ease;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #C8A94B;
      transition: width 0.3s ease;
    }
    .nav-link:hover::after {
      width: 100%;
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isDarkMode = signal(true);
  isBrowser: boolean;

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    effect(() => {
      if (this.isBrowser) {
        if (this.isDarkMode()) {
          this.renderer.removeClass(document.documentElement, 'light');
          this.renderer.addClass(document.documentElement, 'dark');
          this.renderer.setStyle(document.body, 'background-color', '#2E2E2E');
        } else {
          this.renderer.removeClass(document.documentElement, 'dark');
          this.renderer.addClass(document.documentElement, 'light');
          this.renderer.setStyle(document.body, 'background-color', '#F3F4F6');
        }
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen.update(val => !val);
  }

  toggleTheme(): void {
    this.isDarkMode.update(val => !val);
  }
}
