import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkMode = false;

  constructor() {
    this.loadMode();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyMode();
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }

  private loadMode(): void {
    if (this.isBrowser()) {
      const mode = localStorage.getItem('dark-mode');
      if (mode) {
        this.isDarkMode = mode === 'true';
      }
    }
    this.applyMode();
  }

  private applyMode(): void {
    if (this.isBrowser()) {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('dark-mode', this.isDarkMode.toString());
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
